-- Run in the Supabase SQL editor BEFORE deploying the new admin client.
-- Approved scope: exactly the two existing, confirmed, non-anonymous accounts.
-- Aborts the entire transaction if that assumption is not true.
begin;

do $$
begin
  if (select count(*) from auth.users) <> 2 or exists (
    select 1 from auth.users where email_confirmed_at is null or is_anonymous is true
  ) then
    raise exception 'Expected exactly two confirmed team accounts. Review Authentication > Users before applying this migration.';
  end if;
  if not exists (select 1 from storage.buckets where id = 'media') then
    raise exception 'Expected the existing media bucket. No changes applied.';
  end if;
  if not (select relrowsecurity from pg_class where oid = 'storage.objects'::regclass) then
    raise exception 'Storage row-level security must be enabled before applying this migration.';
  end if;
end $$;

create schema if not exists okg_private;
revoke all on schema okg_private from public, anon, authenticated;
create table if not exists okg_private.site_editors (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz not null default now()
);
alter table okg_private.site_editors enable row level security;
revoke all on okg_private.site_editors from public, anon, authenticated;
-- Snapshot current accounts; new signups are NOT automatically authorized.
insert into okg_private.site_editors (user_id) select id from auth.users on conflict do nothing;
delete from okg_private.site_editors where user_id not in (select id from auth.users);

create or replace function public.is_site_editor()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from okg_private.site_editors where user_id = (select auth.uid())); $$;
revoke all on function public.is_site_editor() from public;
grant execute on function public.is_site_editor() to anon, authenticated;

-- Restrictive policies also constrain any older permissive policies.
do $$
declare item record;
begin
  for item in select * from (values
    ('games', 'published is true'),
    ('articles', 'published is true'),
    ('devlogs', 'status = ''published''')
  ) as tables(name, published_test) loop
    execute format('alter table public.%I enable row level security', item.name);
    execute format('revoke all on public.%I from public, anon', item.name);
    execute format('revoke truncate, references, trigger on public.%I from authenticated', item.name);
    execute format('grant select on public.%I to anon', item.name);
    execute format('grant select, insert, update, delete on public.%I to authenticated', item.name);
    execute format('create policy okg_read_guard on public.%I as restrictive for select to anon, authenticated using ((select public.is_site_editor()) or (%s))', item.name, item.published_test);
    execute format('create policy okg_insert_guard on public.%I as restrictive for insert to anon, authenticated with check ((select public.is_site_editor()))', item.name);
    execute format('create policy okg_update_guard on public.%I as restrictive for update to anon, authenticated using ((select public.is_site_editor())) with check ((select public.is_site_editor()))', item.name);
    execute format('create policy okg_delete_guard on public.%I as restrictive for delete to anon, authenticated using ((select public.is_site_editor()))', item.name);
    execute format('create policy okg_public_read on public.%I for select to anon, authenticated using (%s)', item.name, item.published_test);
    execute format('create policy okg_editor_access on public.%I for all to authenticated using ((select public.is_site_editor())) with check ((select public.is_site_editor()))', item.name);
  end loop;
end $$;

-- Public image delivery remains available. Listing and modifying media objects
-- requires an approved account; policies for other buckets remain unchanged.
create policy okg_media_guard on storage.objects as restrictive for all to anon, authenticated
  using (bucket_id <> 'media' or (select public.is_site_editor()))
  with check (bucket_id <> 'media' or (select public.is_site_editor()));
create policy okg_editor_media on storage.objects for all to authenticated
  using (bucket_id = 'media' and (select public.is_site_editor()))
  with check (bucket_id = 'media' and (select public.is_site_editor()));
update storage.buckets set file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/avif']
  where id = 'media';

commit;

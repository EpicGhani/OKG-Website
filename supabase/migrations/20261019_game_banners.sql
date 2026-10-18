-- Apply after 20261018_team_access.sql, before deploying the banner editor.
-- Existing content and editor policies are preserved.
begin;

alter table public.games
  add column if not exists hero_order integer not null default 100,
  add column if not exists hero_banner jsonb not null default '{}'::jsonb,
  add column if not exists game_page_ready boolean not null default true;

alter table public.games add constraint games_hero_order_range check (hero_order between 0 and 999);
alter table public.games add constraint games_hero_banner_shape check (
  jsonb_typeof(hero_banner) = 'object'
  and coalesce(hero_banner->>'theme','default') in ('default','hearthleaf','monster-girl','veridian')
  and coalesce(hero_banner->>'foreground_layout','character') in ('character','logo')
  and (not (hero_banner ? 'includes_title') or jsonb_typeof(hero_banner->'includes_title') = 'boolean')
  and (not (hero_banner ? 'pixel_art') or jsonb_typeof(hero_banner->'pixel_art') = 'boolean')
  and (not (hero_banner ? 'title_lines') or jsonb_typeof(hero_banner->'title_lines') = 'array')
);
create index if not exists games_homepage_order on public.games(hero_order,slug) where published is true and featured is true;

-- Retire only the older demo selections, keeping their published game pages.
update public.games set featured = false where slug in ('anito','tabi-tabi','palay');

-- Populate via the existing table's column types (genres may be text[] or JSON).
insert into public.games (
  slug,title,tagline,status,status_accent,year,genres,accent,pattern,cover_image,
  featured,published,hero_order,hero_banner,game_page_ready
)
select slug,title,tagline,status,status_accent,year,genres,accent,pattern,cover_image,
  featured,published,hero_order,hero_banner,game_page_ready
from jsonb_populate_recordset(null::public.games, $games$[
  {
    "slug":"hearthleaf-corner","title":"Hearthleaf Corner","tagline":"More from Hearthleaf Corner, coming soon.",
    "status":"In development","status_accent":"luntian","year":"","genres":[],"accent":"luntian","pattern":"banig",
    "cover_image":"/images/hero/hearthleaf-cover.webp","featured":true,"published":true,"hero_order":1,"game_page_ready":false,
    "hero_banner":{"theme":"hearthleaf","background":"/images/hero/hearthleaf-background.webp","background_small":"/images/hero/hearthleaf-background-small.webp","foreground":"/images/hero/hearthleaf-foreground.webp","foreground_small":"","title_lines":["Hearthleaf","Corner"],"subtitle":"","includes_title":true,"pixel_art":true,"foreground_layout":"logo"}
  },
  {
    "slug":"monster-girl-tactics","title":"Monster Girl Tactics","tagline":"Strategy + Tactics + Dungeons",
    "status":"In development","status_accent":"pula","year":"","genres":[],"accent":"pula","pattern":"tnalak",
    "cover_image":null,"featured":true,"published":true,"hero_order":2,"game_page_ready":false,
    "hero_banner":{"theme":"monster-girl","background":"","background_small":"","foreground":"/images/hero/monster-girl-site01.webp","foreground_small":"/images/hero/monster-girl-site01-small.webp","title_lines":["Monster","Girl","Tactics"],"subtitle":"Strategy + Tactics + Dungeons","includes_title":false,"pixel_art":false,"foreground_layout":"character"}
  },
  {
    "slug":"steps-to-veridian","title":"Steps to Veridian","tagline":"More from Steps to Veridian, coming soon.",
    "status":"In development","status_accent":"bughaw","year":"","genres":[],"accent":"bughaw","pattern":"diamond",
    "cover_image":null,"featured":true,"published":true,"hero_order":3,"game_page_ready":false,
    "hero_banner":{"theme":"veridian","background":"","background_small":"","foreground":"/images/hero/veridian-site02.webp","foreground_small":"/images/hero/veridian-site02-small.webp","title_lines":["Steps to","Veridian"],"subtitle":"","includes_title":false,"pixel_art":false,"foreground_layout":"character"}
  }
]$games$::jsonb)
on conflict (slug) do update set
  hero_order = excluded.hero_order,
  hero_banner = excluded.hero_banner,
  game_page_ready = excluded.game_page_ready,
  featured = excluded.featured,
  cover_image = coalesce(public.games.cover_image, excluded.cover_image)
-- Never overwrite a banner already configured by an editor, or publish a draft.
where public.games.hero_banner = '{}'::jsonb;

notify pgrst, 'reload schema';
commit;

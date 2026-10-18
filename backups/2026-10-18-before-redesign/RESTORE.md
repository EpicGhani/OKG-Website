# Before the landing redesign — 2026-10-18

64 source files were copied and SHA-256 verified before edits: pages, sections,
UI components, data, libraries, App.tsx, and main.tsx. CSS, assets, dependencies,
credentials, and generated builds are intentionally excluded. This is a source
snapshot to restore into this repository, not a standalone deployable project.

From the repository root in PowerShell:

```powershell
Copy-Item -Path '.\backups\2026-10-18-before-hero-redesign\src\*' -Destination '.\src' -Recurse -Force
npm run build
```

This replaces matching source files with saved versions. Save newer work first.
Existing CSS/assets/configuration remain in use. New files are not deleted;
restoring the original Hero.tsx disconnects the new hero CSS and configuration.
Deploy the resulting dist folder through your normal flow.

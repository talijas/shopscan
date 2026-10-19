# ShopScan — Simple interface (v4)

Upload `index.html`, `sw.js`, `manifest.webmanifest`, `icon.svg` to the root of https://github.com/talijas/shopscan.

Changes:
- Scanner and optional camera/lens/zoom settings at top
- Only two primary scan controls: Activate/Deactivate camera and Tap to scan
- Small offline file-preparation progress
- One Actions dropdown for Save locally, Export PDF, Export Excel
- Current list below scanner, with live product counts and rows
- All saved lists below: Preview, Continue scanning, PDF, Excel
- Backup/restore all lists
- Existing browser localStorage keys and offline behavior retained

Important: Local storage is per browser/device. Back up all lists before clearing site data. Camera and offline behavior need testing on Honor and iPhone. The progress indicator shows offline file caching, not native OS installation.

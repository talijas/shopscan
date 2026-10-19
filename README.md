# ShopScan — Polished offline version

Upload all four website files (index.html, sw.js, manifest.webmanifest, icon.svg) to the ROOT of https://github.com/talijas/shopscan.

## New
- Updated responsive interface and clear camera/live list hierarchy.
- Visible offline preparation progress for the 8 cached app/library resources. This is **not** Android/iOS native app installation progress: browsers control the actual installation dialog and do not provide a JavaScript API for its percentage.
- Automatic local saving of named lists with creation dates, as before.
- "Backup all lists" downloads a JSON file. "Restore backup" replaces existing saved lists after confirmation.
- Offline readiness is reported only when all app resources and external scanning/export libraries are cached.

## How to test
1. Connect to internet and open https://talijas.github.io/shopscan/
2. Wait for the progress to reach 100% and say "Offline ready". Tap "Check again" if necessary.
3. Switch to airplane mode and test barcode scanning and exports.
4. Download a JSON backup and keep it safe.

## Limitations
- Local lists live in the browser's localStorage. Clearing site data, uninstalling an installed web app, or some browser storage eviction can erase them. Export JSON backups.
- Lists do not sync across devices.
- Browser/OS controls the native install progress. This in-app progress shows offline resource preparation, not the install percentage.
- Offline caching of external CDN scripts may fail on restrictive networks. The app will say setup incomplete rather than falsely claiming readiness.
- Browser camera support and manual focus/zoom differ by phone model.

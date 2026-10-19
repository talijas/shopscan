# ShopScan — Offline-capable version

Upload ALL these files to the root of your existing GitHub Pages repository:
- index.html
- sw.js
- manifest.webmanifest
- icon.svg

Do not delete or clear Chrome site storage: saved lists are stored locally in the browser.

## First-time offline setup
1. Open https://talijas.github.io/shopscan/ while connected to the internet.
2. Wait until the banner says "Offline ready ✓ (camera, Excel and PDF cached)".
3. If it says setup incomplete, refresh once while online. If it remains incomplete, your browser/network may be blocking one of the third-party library CDNs.
4. Switch on airplane mode and reopen the same website to test camera, list saving, Excel and PDF.

The first online visit is REQUIRED. Offline mode is device/browser specific. Camera scanning requires a supported secure browser and camera permission. If browser site data is cleared, the app needs online setup again. There is no automatic cross-device sync or cloud backup. Export important lists.

The app caches third-party JavaScript libraries from their original CDNs at initial installation. It does not contain local copies of these libraries. Offline readiness is only reported when all cache entries exist; it does not guarantee every browser supports scanning or exporting.

On some Android devices, installing as a PWA may still require proper PNG app icons; you can use Chrome Add to Home screen as a shortcut.


## iPhone focus and lens selection
Tap Find cameras after granting camera permission, select another rear camera, then tap Start camera. The Zoom slider appears only if the selected camera exposes zoom capabilities. Continuous autofocus is requested when supported. iOS Safari may not expose focus or zoom controls. Try holding a barcode 15–30 cm away and moving slowly closer/farther.

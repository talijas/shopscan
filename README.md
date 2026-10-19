# ShopScan Simple — Phase 1

A small browser-based barcode scanning prototype for phone, tablet and PC.

## Features
- Scan common retail barcodes using a device camera.
- Enter a barcode manually if scanning fails.
- Repeated barcodes increase the count instead of creating duplicate rows.
- Save multiple lists by name; each list records its creation date and time.
- Choose a previously saved list from the dropdown. Each list's products are saved separately.
- Rename product labels, adjust counts, search and delete entries.
- Export the active list to Excel (.xlsx) or PDF. Export filenames use the list name.
- Saves locally in the current browser/device using localStorage.

## Run it
Extract the ZIP and open `shop-product-scanner/index.html` in a modern browser. For camera scanning, serve it from an HTTPS website or localhost and allow camera permission. Internet access is needed to load the scanner and export libraries from CDNs.

## Important limitations
- Lists are saved only in the browser on the device where they were created; they do not sync across devices or users.
- Clearing browser data may remove locally saved lists. Export backups regularly.
- This is a prototype, not a hosted multi-user production app.

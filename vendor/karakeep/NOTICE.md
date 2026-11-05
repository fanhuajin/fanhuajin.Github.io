# Karakeep assets

Source: https://github.com/karakeep-app/karakeep

Captured from https://try.karakeep.com (displayed version v0.34.1) on 2026-11-05.

The CSS files are unmodified copies from /_next/static/chunks/. The seven Inter WOFF2 files are from /_next/static/media/; relative CSS font URLs are preserved.

## SHA-256

0lg8440ddxz-7.css: e18eca41eaa0e9ef74df9857896ce108362af03c336ce647556e9a10889d019e
2w0tueemskryn.css: 24e1658b54cc44bc137c2cea7e413f20d54259212120f313cde4ac25005b8ff4

## Adaptation

The original header SVG book/bookmark graphic is preserved in assets/logo.svg, assets/favicon.svg and the entry document. Only the Karakeep wordmark becomes SoftShelf. icons.js packages Lucide SVG paths captured from the demo, supplemented with needed icons from the official lucide-icons/lucide repository. Icon paths are preserved; client classes/sizing are adapted.

app.js and style.css adapt the observed components and original CSS utilities to static data. Original server-backed Next.js JavaScript is not bundled as a working backend. Software covers and bulk actions are adapted to this catalog. No demo content or analytics is bundled.

## Licenses

Karakeep: AGPL-3.0, LICENSE. Corresponding adapted source: https://github.com/fanhuajin/soft-shelf . Inter: SIL OFL, media/LICENSE.txt (rsms/inter). Lucide: icons/LICENSE. Software logos and third-party trademarks remain their owners property.

## Card interaction extraction (2026-11-05)

The hover selector, drag-handle and selection overlay use the original utility-class strings from BulkEditSelectionOverlay, HoverActionBar and DragHandle in apps/web/components/dashboard/bookmarks/BookmarkLayoutAdaptingCard.tsx at upstream commit 6a1e71d67c10b2f56d55e8d771be0dd0c2cf6316. The demo DOM capture confirmed the selector/handle classes. Original Circle/CircleCheck/GripVertical icon paths are used. Backend session/store bindings are replaced by the existing static selection state; custom hover/selected-background CSS was removed.

The selector/drag/bulk interaction extraction above is historical: those controls were removed at the user request. Current cards use original Lucide download/external-link icons in dedicated action links; card contents do not navigate. The unmodified original CSS remains in use.

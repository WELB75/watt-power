# Third-party assets

The Watt Power prototype uses third-party assets with their original licenses.

| Asset | Creator / source | License | Source |
|---|---|---|---|
| Solar Panel GLB | Quaternius / Poly Pizza | CC0 1.0 | https://poly.pizza/m/ah89Y79JdT |
| Battery GLB | Quaternius / Poly Pizza | CC0 1.0 | https://poly.pizza/m/MYa3uWdwPU |
| COTEK SP-3000 inverter GLB | Rising Tide Research Foundation / Solander 38 | CC BY 4.0 | https://github.com/risingtideresearch/solander-38-website |
| Modern House GLB | henry ham / Poly Pizza | Creative Commons Attribution | https://poly.pizza/m/d_k2teZePG6 |
| Rogland Sunset image/HDRI | Greg Zaal / Poly Haven | CC0 | https://polyhaven.com/a/rogland_sunset |
| Painted Plaster Wall texture | Amal Kumar / Poly Haven | CC0 | https://polyhaven.com/a/painted_plaster_wall |

## Runtime delivery

For this prototype the GLB files are referenced from pinned public GitHub revisions and the image/texture previews are served by Poly Haven's CDN. This keeps the source and provenance explicit. Before a final production handoff, these files can be vendored into `public/assets/` and optimized further if desired.

## Villa aerial v2 (2026-09-21)

`public/assets/images/villa-aerial-v2.webp` is an AI-generated architectural illustration created with the built-in imagegen tool, not a photograph of an actual Watt Power installation. The 1536 × 1024 source was converted to WebP (quality 88, about 413 KB). It is committed locally; the homepage no longer requires VILLA_B64 environment chunks. Older 3D components and credits remain preserved.

Prompt: “Use case: photorealistic-natural. Create a premium architectural photography website backdrop, landscape 1536x1024. Elevated drone three-quarter view of an exceptional contemporary luxury villa in Marrakech, warm ivory travertine and lime plaster, sophisticated large glass facades, mature palms, olive trees, reflective swimming pool, subtle distant Atlas mountains and ochre landscape. Golden hour, warm realistic sunlight, natural fine detail, editorial architecture photography, absolutely not toy-like or Lego or 3D illustration. Composition: entire villa visible mainly center/right, a large empty flat rectangular rooftop very clearly visible in the upper-middle/right for later programmatic overlay of solar panels. Roof must be simple, broad, unobstructed, no pergola on this roof. Pool in lower third. Landscape to the left allows text overlay. No solar panels anywhere, no people, no text, no watermark. Camera looking down about 35 degrees, natural perspective.”

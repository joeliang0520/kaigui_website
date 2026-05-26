# Website Image Replacement Map

All replaceable marketing-site images should live in this folder:

`public/images`

Use the exact filenames below. In code, the public URL is `/images/<filename>`.
The 3D pin designer is intentionally excluded; its models, material textures, and option thumbnails stay under `public/pin-designer/`.

The generated placeholder PNGs can be replaced directly with final photography or document scans. Keep the same filename unless you also update the code reference.

| Route | Page section | File to replace | Public URL used by site | Code reference | Recommended image |
| --- | --- | --- | --- | --- | --- |
| `/` | Hero background facility image | `public/images/kaigui_logo_factory.avif` | `/images/kaigui_logo_factory.avif` | `app/page.tsx` | Wide factory or production floor image |
| `/` | Kunshan production campus card | `public/images/kunshan-production-campus.png` | `/images/kunshan-production-campus.png` | `app/page.tsx` | Vertical/cropped facility campus or shop-floor image |
| `/` | Kunshan city image below production campus | `public/images/kunshan.jpg` | `/images/kunshan.jpg` | `app/page.tsx` | Kunshan City, Jiangsu, China regional context image |
| `/about` | Top-right hero facility image | `public/images/about-hero-facility.png` | `/images/about-hero-facility.png` | `app/about/page.tsx` | Wide facility, workshop, or team-at-work image |
| `/about` | Our Story heritage image | `public/images/about-heritage-workshop.png` | `/images/about-heritage-workshop.png` | `app/about/page.tsx` | Heritage, factory, or older workshop image |
| `/about` | Factory Tour section image | `public/images/factory-tour-facility-exterior.jpg` | `/images/factory-tour-facility-exterior.jpg` | `app/about/page.tsx` | Factory exterior or facility entrance image |
| `/about` | Message from Tom background | `public/images/about-tom-message-background.png` | `/images/about-tom-message-background.png` | `app/about/page.tsx` | Soft background image; will render with low opacity |
| `/about/factory-tour` | Factory tour hero/facility image | `public/images/factory-tour-facility-exterior.jpg` | `/images/factory-tour-facility-exterior.jpg` | `app/about/factory-tour/page.tsx` | Facility exterior or production campus image |
| `/about/factory-tour` | Factory tour video poster | `public/images/factory-tour-video-poster.jpg` | `/images/factory-tour-video-poster.jpg` | `app/about/factory-tour/page.tsx` | Video poster image for factory tour player |
| `/about/factory-tour` | Quality control process image | `public/images/factory-tour-quality-control.png` | `/images/factory-tour-quality-control.png` | `app/about/factory-tour/page.tsx` | Quality control or inspection process image |
| `/about/factory-tour` | Environmental control process image | `public/images/factory-tour-environmental-control.png` | `/images/factory-tour-environmental-control.png` | `app/about/factory-tour/page.tsx` | Environmental controls, wastewater treatment, or compliance process image |
| `/about/factory-tour` | Factory floor oversight image | `public/images/factory-tour-leadership-floor.jpg` | `/images/factory-tour-leadership-floor.jpg` | `app/about/factory-tour/page.tsx` | Leadership, production-floor, or operations oversight photo |
| `/about/factory-tour` | Production detail image | `public/images/factory-tour-production-detail.jpg` | `/images/factory-tour-production-detail.jpg` | `app/about/factory-tour/page.tsx` | Production detail, finishing, enamel, or plating work photo |
| `/about/factory-tour` | Client logo: PSA BDP | `public/images/factory-tour-client-psa-bdp.jpg` | `/images/factory-tour-client-psa-bdp.jpg` | `app/about/factory-tour/page.tsx` | PSA BDP logo image |
| `/about/factory-tour` | Client logo: Elgin Military Museum | `public/images/factory-tour-client-elgin.jpeg` | `/images/factory-tour-client-elgin.jpeg` | `app/about/factory-tour/page.tsx` | Elgin Military Museum logo image |
| `/about/factory-tour` | Client logo: Aga Khan Museum | `public/images/factory-tour-client-aga-khan.png` | `/images/factory-tour-client-aga-khan.png` | `app/about/factory-tour/page.tsx` | Aga Khan Museum logo image |
| `/about/factory-tour` | Client logo: Eagle Emblems | `public/images/factory-tour-client-mark.png` | `/images/factory-tour-client-mark.png` | `app/about/factory-tour/page.tsx` | Eagle Emblems logo image |
| `/about/factory-tour` | Client logo: Foxconn | `public/images/factory-tour-client-foxconn.png` | `/images/factory-tour-client-foxconn.png` | `app/about/factory-tour/page.tsx` | Foxconn logo image |
| `/about/history` | Foundation electroplating photo | `public/images/history-foundation.png` | `/images/history-foundation.png` | `app/about/history/page.tsx` | Early electroplating, workshop, or archive image |
| `/about/history` | Kunshan move photo, left | `public/images/history-kunshan-district.png` | `/images/history-kunshan-district.png` | `app/about/history/page.tsx` | Kunshan industrial district or facility exterior |
| `/about/history` | Kunshan move photo, right | `public/images/history-plating-detail.png` | `/images/history-plating-detail.png` | `app/about/history/page.tsx` | Plating, metal finishing, or production detail |
| `/about/founders` | Founders hero image | `public/images/founders-hero.png` | `/images/founders-hero.png` | `app/about/founders/page.tsx` | Founders, craftsmanship, or leadership image |
| `/about/founders` | Mr. Lee portrait | `public/images/founder-mr-lee.png` | `/images/founder-mr-lee.png` | `app/about/founders/page.tsx` | Portrait or representative image for Mr. Lee |
| `/about/founders` | Nancy Jan portrait | `public/images/founder-nancy-jan.png` | `/images/founder-nancy-jan.png` | `app/about/founders/page.tsx` | Portrait or representative image for Nancy Jan |
| `/about/second-generation` | Tom portrait/sidebar image | `public/images/tom-portrait.png` | `/images/tom-portrait.png` | `app/about/second-generation/page.tsx` | Portrait or representative image for Tom |
| `/product` | Hard enamel product card | `public/images/product-hard-enamel.png` | `/images/product-hard-enamel.png` | `app/product/page.tsx` | Hard enamel pin close-up |
| `/product` | Soft enamel product card | `public/images/product-soft-enamel.png` | `/images/product-soft-enamel.png` | `app/product/page.tsx` | Soft enamel pin close-up |
| `/product` | Die struck product card | `public/images/product-die-struck.png` | `/images/product-die-struck.png` | `app/product/page.tsx` | Die struck or metal-only pin close-up |
| `/product` | 3D mold product card | `public/images/product-3d-mold.png` | `/images/product-3d-mold.png` | `app/product/page.tsx` | Sculptural 3D molded pin or dimensional ornament close-up |
| `/product` | Laser-cut product card | `public/images/product-laser-cut.png` | `/images/product-laser-cut.png` | `app/product/page.tsx` | Laser-cut pin, sharp silhouette, or cutout product close-up |
| `/product` | Acrylic product banner | `public/images/product-acrylic.png` | `/images/product-acrylic.png` | `app/product/page.tsx` | Acrylic pin or translucent acrylic product image |
| `/licensing` | Hero electroplating process image | `public/images/licensing-electroplating-process.webp` | `/images/licensing-electroplating-process.webp` | `app/licensing/page.tsx` | Electroplating process, wastewater treatment, or compliance photo |
| `/licensing` | Pollutant discharge permit document | `public/images/pollutant-discharge-permit.png` | `/images/pollutant-discharge-permit.png` | `app/licensing/page.tsx` | Final pollutant discharge permit scan |
| `/licensing` | Electroplating compliance certificate document | `public/images/electroplating-compliance-certificate.png` | `/images/electroplating-compliance-certificate.png` | `app/licensing/page.tsx` | Final electroplating compliance certificate scan |
| `/licensing` | License support system: Quality Control | `public/images/factory-tour-quality-control.png` | `/images/factory-tour-quality-control.png` | `app/licensing/page.tsx` | Quality control or inspection process image |
| `/licensing` | License support system: Environmental Control | `public/images/factory-tour-environmental-control.png` | `/images/factory-tour-environmental-control.png` | `app/licensing/page.tsx` | Environmental controls, wastewater treatment, or compliance process image |

## Product Detail Gallery Images

These images appear on the product detail pages at `/product/<style>`.
Replace each placeholder with customer-safe real-world product photos.

| Detail route | Gallery file | Public URL used by site | Code reference | Recommended image |
| --- | --- | --- | --- | --- |
| `/product/hard-enamel` | `public/images/product-hard-enamel-gallery-1.png` | `/images/product-hard-enamel-gallery-1.png` | `lib/productCatalog.ts` | Hard enamel finished product, angle 1 |
| `/product/hard-enamel` | `public/images/product-hard-enamel-gallery-2.png` | `/images/product-hard-enamel-gallery-2.png` | `lib/productCatalog.ts` | Hard enamel color-fill close-up |
| `/product/hard-enamel` | `public/images/product-hard-enamel-gallery-3.png` | `/images/product-hard-enamel-gallery-3.png` | `lib/productCatalog.ts` | Hard enamel packaging or group shot |
| `/product/soft-enamel` | `public/images/product-soft-enamel-gallery-1.png` | `/images/product-soft-enamel-gallery-1.png` | `lib/productCatalog.ts` | Soft enamel raised-metal detail |
| `/product/soft-enamel` | `public/images/product-soft-enamel-gallery-2.png` | `/images/product-soft-enamel-gallery-2.png` | `lib/productCatalog.ts` | Soft enamel bright color sample |
| `/product/soft-enamel` | `public/images/product-soft-enamel-gallery-3.png` | `/images/product-soft-enamel-gallery-3.png` | `lib/productCatalog.ts` | Soft enamel production batch or packaging |
| `/product/die-struck` | `public/images/product-die-struck-gallery-1.png` | `/images/product-die-struck-gallery-1.png` | `lib/productCatalog.ts` | Die struck antique metal sample |
| `/product/die-struck` | `public/images/product-die-struck-gallery-2.png` | `/images/product-die-struck-gallery-2.png` | `lib/productCatalog.ts` | Die struck polished highlight detail |
| `/product/die-struck` | `public/images/product-die-struck-gallery-3.png` | `/images/product-die-struck-gallery-3.png` | `lib/productCatalog.ts` | Die struck metal-only group shot |
| `/product/3d-mold` | `public/images/product-3d-mold-gallery-1.png` | `/images/product-3d-mold-gallery-1.png` | `lib/productCatalog.ts` | 3D molded raised relief sample |
| `/product/3d-mold` | `public/images/product-3d-mold-gallery-2.png` | `/images/product-3d-mold-gallery-2.png` | `lib/productCatalog.ts` | 3D molded curved surface detail |
| `/product/3d-mold` | `public/images/product-3d-mold-gallery-3.png` | `/images/product-3d-mold-gallery-3.png` | `lib/productCatalog.ts` | 3D molded antique finish or group shot |
| `/product/laser-cut` | `public/images/product-laser-cut-gallery-1.png` | `/images/product-laser-cut-gallery-1.png` | `lib/productCatalog.ts` | Laser-cut custom outline sample |
| `/product/laser-cut` | `public/images/product-laser-cut-gallery-2.png` | `/images/product-laser-cut-gallery-2.png` | `lib/productCatalog.ts` | Laser-cut internal cutout detail |
| `/product/laser-cut` | `public/images/product-laser-cut-gallery-3.png` | `/images/product-laser-cut-gallery-3.png` | `lib/productCatalog.ts` | Laser-cut production batch or display |
| `/product/acrylic` | `public/images/product-acrylic-gallery-1.png` | `/images/product-acrylic-gallery-1.png` | `lib/productCatalog.ts` | Acrylic transparent-edge sample |
| `/product/acrylic` | `public/images/product-acrylic-gallery-2.png` | `/images/product-acrylic-gallery-2.png` | `lib/productCatalog.ts` | Acrylic full-color illustrated sample |
| `/product/acrylic` | `public/images/product-acrylic-gallery-3.png` | `/images/product-acrylic-gallery-3.png` | `lib/productCatalog.ts` | Acrylic display set or group shot |

## Factory Tour Video

The factory tour page also uses one replaceable video file outside this image folder:

| Route | Media section | File to replace | Public URL used by site | Code reference | Recommended media |
| --- | --- | --- | --- | --- | --- |
| `/about/factory-tour` | Factory tour video player | `public/videos/factory-tour.mp4` | `/videos/factory-tour.mp4` | `app/about/factory-tour/page.tsx` | Final edited factory tour MP4, 16:9 preferred |

## Notes

- Use PNG exports for the filenames listed here. If you want JPG or WebP, update the matching code path and this README together.
- Large hero or wide product images work best around 1600 px wide or larger.
- Portrait images work best around a 3:4 or 4:5 aspect ratio.
- Document scans should stay high enough resolution for the certificate preview modal.
- The factory tour video is stored in `public/videos` because it is not an image, but its poster image is stored in `public/images`.
- Do not move the 3D pin viewer assets into this folder.

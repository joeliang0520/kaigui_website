# Option Details (MD Files)

Each option in steps 3–7 has a corresponding Markdown file. Edit these files to customize the name and description shown in the hover flow box.

## File structure

```
content/options/
├── plating/       (gold.md, silver.md, nickel.md, ...)
├── effects/       (glow.md, glitter.md, rhinestones.md, ...)
├── attachment/    (butterfly_clutch.md, rubber_clutch.md, ...)
├── backSide/      (laser_engraving.md, back_stamp.md, plain_back.md)
└── packaging/    (poly_bag.md, velvet_pouch.md, ...)
```

## Frontmatter format

```md
---
name: Display Name
description: Short description shown in the hover tooltip.
---
```

- **name**: Shown as the option title in the flow box
- **description**: Shown as the body text (supports multiple lines)

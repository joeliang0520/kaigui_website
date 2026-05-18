# Option Images (Real-World Photos)

Store real-world product photos for each customization option. These images appear in the detail popup next to the 3D model.

## Folder Structure

```
option-images/
├── plating/      # e.g. gold.jpg, silver.jpg, nickel.jpg
├── effects/      # e.g. glow.jpg, glitter.jpg, rhinestones.jpg
├── attachment/   # e.g. butterfly_clutch.jpg, safety_pin.jpg
├── backSide/     # e.g. plain_back.jpg, laser_engraving.jpg
└── packaging/    # e.g. poly_bag.jpg, velvet_box.jpg
```

## Naming Convention

Use the option ID from `pinConfig.ts` as the filename:

- **Format:** `{optionId}.jpg` or `{optionId}.png`
- **Examples:**
  - `plating/gold.jpg`
  - `attachment/butterfly_clutch.jpg`
  - `packaging/velvet_box.jpg`

If an image is missing, the detail popup will show a placeholder.

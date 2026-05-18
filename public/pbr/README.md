# PBR Materials for Metal Plating (ambientCG)

Store ambientCG PBR materials here for each metal finish option. Each plating option has its own folder.

## Folder Structure

```
public/pbr/
├── gold/           # Gold plating
├── silver/         # Silver plating
├── nickel/         # Nickel plating
├── black_nickel/   # Black nickel plating
├── copper/         # Copper plating
├── antique_gold/   # Antique gold plating
├── antique_silver/ # Antique silver plating
├── antique_copper/ # Antique copper plating
└── dyed_black/    # Dyed black plating
```

## How to Add Materials

1. Download a PBR material from [ambientCG](https://ambientcg.com/) (e.g. Metal048A 2K-JPG)
2. Extract the zip contents into the folder for the plating option (e.g. `gold/`)
3. The app expects these files (ambientCG naming convention):
   - `*_Color.jpg` or `*_Color.png` – base color/albedo
   - `*_Normal.jpg` or `*_Normal.png` – normal map (optional)
   - `*_Roughness.jpg` or `*_Roughness.png` – roughness map (optional)
   - `*_Metalness.jpg` or `*_Metalness.png` – metalness map (optional)

## File Naming

Place the extracted files in each folder. The loader looks for:
- `*_Color.jpg` / `*_Color.png` – base color
- `*_Normal.jpg` / `*_Normal.png` – normal map
- `*_Roughness.jpg` / `*_Roughness.png` – roughness
- `*_Metalness.jpg` / `*_Metalness.png` – metalness

If no PBR files are found, the app falls back to solid colors from `PLATING_COLORS`.

## Alternative: content/pbr

You can also store raw zips in `content/pbr/{plating_id}/`. After extracting, copy the JPG/PNG files to `public/pbr/{plating_id}/` so the web app can serve them.

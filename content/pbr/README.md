# PBR Material Storage (ambientCG)

Store downloaded ambientCG PBR materials here. Each metal plating option has its own folder.

## Folder Structure

```
content/pbr/
├── gold/           # Gold plating – put Metal###_2K-JPG.zip or extracted files
├── silver/         # Silver plating
├── nickel/         # Nickel plating
├── black_nickel/   # Black nickel plating
├── copper/         # Copper plating
├── antique_gold/   # Antique gold plating
├── antique_silver/ # Antique silver plating
├── antique_copper/ # Antique copper plating
└── dyed_black/    # Dyed black plating
```

## Workflow

1. Download PBR material from [ambientCG](https://ambientcg.com/) (e.g. Metal048A, 2K-JPG)
2. Place the zip in the appropriate folder (e.g. `content/pbr/gold/Metal048A_2K-JPG.zip`)
3. Extract the zip contents into the same folder
4. Copy the extracted JPG/PNG files to `public/pbr/{plating_id}/` so the web app can serve them

The app reads textures from `public/pbr/` at runtime. Files in `content/` are for storage; copy to `public/pbr/` after extracting.

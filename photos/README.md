# Personal NYC birthday montage photos

The personalized birthday montage in the root `index.html` loads the 20 JPEG files in this folder.

## Prepared photo assets

These are web-sized JPEG copies (up to 1600 pixels on the long side), converted from the supplied HEIC/JPG photos. Orientation is baked into the images and EXIF/location metadata is removed. The original files were left unchanged.

The founder approved matching alternatives for two absent selections:

- `IMG_6351.jpeg` uses `IMG_6352.HEIC` (Chrysler Building portrait).
- `IMG_6188.jpeg` uses `IMG_6190.HEIC` (laughing birthday dinner toast).

`IMG_6042.jpeg` came from the original chat attachment; the other 19 source images came from the supplied Downloads/new-york-images folder.

## Playback order

- IMG_5958.jpeg — Times Square laughs
- IMG_5979.jpeg — Subway smiles
- IMG_6042.jpeg — One of our NYC nights
- IMG_6119.jpeg — The Hufflepuff moment
- IMG_6107.jpeg — Brooklyn together
- IMG_6101.jpeg — DUMBO in autumn
- IMG_6076.jpeg — Walking the Brooklyn Bridge
- IMG_6144.jpeg — A colorful NYC moment
- IMG_6149.jpeg — A birthday wish on the wall
- IMG_6139.jpeg — Our NYC pancake stop
- IMG_6386.jpeg — A little bookstore magic
- IMG_6376.jpeg — Under the book arch
- IMG_6308.jpeg — SUMMIT — best friends on top
- IMG_6363.jpeg — New York at golden hour
- IMG_6351.jpeg — Chrysler Building views
- IMG_6341.jpeg — City views worth celebrating
- IMG_6399.jpeg — Dinner memories
- IMG_6188.jpeg — Birthday laughs at Crown Shy
- IMG_6174.jpeg — Birthday smiles
- IMG_6256.jpeg — One last birthday dessert

## Updating and deployment

Upload replacement JPEGs with exactly the filenames above. GitHub Actions publishes changes to `main`. Upload and validate assets before changing the animation.

This repository and GitHub Pages site are public. The personal photos are publicly accessible. Do not upload ticket QR codes, booking references, or payment details.

If an image fails to load, the montage uses a public NYC landmark image as its fallback.

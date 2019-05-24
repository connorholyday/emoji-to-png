const fontkit = require("fontkit");
const fs = require("fs");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const emoji = require("node-emoji");

fs.unlinkSync(__dirname + "/emoji.json");
fs.writeFileSync(__dirname + "/emoji.json");
rimraf.sync(__dirname + "/images");
mkdirp.sync(__dirname + "/images");

const collectionPath = "/System/Library/Fonts/Apple Color Emoji.ttc";

function getFont() {
  if (fs.existsSync(collectionPath)) {
    return fontkit.openSync(collectionPath).fonts[0];
  }
  console.log("Could not find the emoji font");
  return null;
}

const names = {};
const font = getFont();
if (font) {
  for (let i = 0; i < font.numGlyphs; i++) {
    const glyph = font.getGlyph(i);
    const strings = font.stringsForGlyph(i);

    if (strings.length > 0) {
      for (let s of strings) {
        const run = font.layout(s);

        if (run.glyphs.length > 0) {
          const found = emoji.find(s);

          if (found) {
            names[found.key] = s;
            const image = run.glyphs[0].getImageForSize(160);

            if (image) {
              fs.writeFileSync(
                __dirname + "/images/" + found.key + ".png",
                image.data
              );
            }
          }
        }
      }
    }
  }
}
fs.writeFileSync(__dirname + "/emoji.json", JSON.stringify(names));

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const emoji = require("node-emoji");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.static("static"));
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get("/:emoji", (req, res) => {
    const input = req.params.emoji;

    if (input) {
      getImageFile(input, res);
    }

    return app.render(req, res, "/");
  });

  server.post("/emoji", (req, res) => {
    const input = req.body.emoji;

    if (input) {
      getImageFile(input, res);
    }

    return app.render(req, res, "/");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  function getImageFile(name, res) {
    const emojiObject = emoji.find(name);

    if (emojiObject) {
      const file = `${__dirname}/static/images/${emojiObject.key}.png`;
      fs.access(file, fs.constants.F_OK, err => {
        if (err) {
          res.status(404).json({ message: `Emoji ${name} not found` });
        } else {
          res.download(file);
        }
      });
    } else {
      res.status(404).json({ message: `Emoji ${name} not found` });
    }
  }

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

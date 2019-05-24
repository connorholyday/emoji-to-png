const emoji = require("node-emoji");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile("index.html"));
app.get("/emoji/:emoji", (req, res) => {
  const input = req.params.emoji;

  sendEmojiResponse(res, input);
});
app.get("*", (req, res) => res.redirect("/"));

app.post("/emoji", (req, res) => {
  const input = req.body.emoji;

  if (!input) {
    res.redirect("/");
  }

  sendEmojiResponse(res, input);
});

function sendEmojiResponse(res, input) {
  const emojiObject = emoji.find(input);

  if (!emojiObject) {
    res.status(404).sendFile(__dirname + "/public/404.html");
    return;
  }

  res.download("./images/" + emojiObject.key + ".png");
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

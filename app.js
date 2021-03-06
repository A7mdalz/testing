const distanceInWordsToNow = require("date-fns/distance_in_words_to_now");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const upload_path = path.join(__dirname, "/", "public", "uploads", "/");
const hsa_path = path.join(__dirname, "/", "hsa", "/");

const sleep = millis => new Promise(resolve => setTimeout(resolve, millis));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, upload_path);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/uploadfile", upload.single("uploadinp"), async (req, res, next) => {
  res.sendStatus(200);

  const file = req.file;
  const src = upload_path + file.filename;
  const dst = hsa_path + file.filename;

  await sleep(2000);
  fs.copyFileSync(src, dst);
});

app.get("/listuploads", async (req, res) => {
  const files = fs.readdirSync(upload_path).map(f => {
    const stat = fs.statSync(upload_path + f);
    return { name: f, size: stat.size, timestamp: stat.ctimeMs, created: distanceInWordsToNow(stat.ctimeMs, { addSuffix: true, includeSeconds: true }) };
  });
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(files.sort((a, b) => b.timestamp - a.timestamp)));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

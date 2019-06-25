const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const upload_path = path.join(__dirname, "/", "public", "uploads", "/");

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
  const dst = file.filename;
  fs.copyFileSync(src, "/hrapp2/" + dst);
  await sleep(2000);
  fs.copyFileSync(src, "/hrapp/" + dst);
});

app.get("/listuploaded", async (req, res) => {
  const files = fs.readdirSync(upload_path);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(files));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

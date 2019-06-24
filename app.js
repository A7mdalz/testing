const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require('fs');

const upload_path = __dirname + "/public/uploads/";


if (!fs.existsSync(upload_path)){
    fs.mkdirSync(upload_path);
}


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

app.post("/uploadfile", upload.single("uploadinp"), (req, res, next) => {
  const file = req.file;
  console.log(file);
  fs.copyFileSync(upload_path+file.filename,'/hrapp2/')
  fs.copyFileSync(upload_path+file.filename,'/hrapp/')
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

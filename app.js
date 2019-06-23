const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");

const upload = multer({ dest: "public/uploads/" });

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/uploadfile", upload.single("uploadinp"), (req, res, next) => {
  const file = req.file;
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

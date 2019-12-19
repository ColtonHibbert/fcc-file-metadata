'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');
let upload = multer({ dest: 'uploads/' })
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  console.log(req,"here is req")
  console.log(req.file, "here is req.file")
  const fileName = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;
  console.log(fileName, type, size)
  res.json({
    "name": fileName,
    "type": type,
    "size": size
  })
})

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

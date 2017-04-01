var express = require('express');
var multer = require('multer');
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
})

var upload = multer({ storage: storage })

const {execFile} = require('child_process');
const guetzli = require('guetzli');

execFile(guetzli, ['input.jpg', 'output.jpg'], err => {
    console.log('Image minified!');
});


var uploading = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 10000000, files:1},
});

router.post('/upload', upload.single("image"), function(req, res)
{
  var file = req.file;
  console.log(file);
  res.end();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

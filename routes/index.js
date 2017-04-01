var express = require('express');
var multer = require('multer');
var router = express.Router();
var http = require('http');
//var server = http.createServer(express);
//
//settings for uploading
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
})

//server.listen(3000);
//io.sockets.on('connection')


//Settings for uploading
var upload = multer({ storage: storage })

const {execFile} = require('child_process');
const guetzli = require('guetzli');

//Compress the image
function minify(file, res){
  execFile(guetzli, [file.path, './uploads/output.jpg'], err => {
    console.log('Image minified!');
    res.render('index', {title: 'Express', currentStatus: 'Heres your sexy shrunken file'});
})};


//Submit image
router.post('/upload', upload.single("image"), function(req, res)
{
  var file = req.file;
  console.log(file);
  minify(file, res);
  res.render('index', {title: 'Express', currentStatus: 'File Uploaded'});
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', currentStatus: 'Upload in progress'});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var multer = require('multer');


var uploading = multer({
  dest: __dirname + '../public/uploads/',
  limits: {fileSize: 10000000, files:1},
})

router.post('/upload', function(req, res)
{

});

module.exports = router

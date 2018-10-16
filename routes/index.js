var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bài 2' });
});

router.get('/upload', function(req,res, next){
  res.render('uploadfile');
});

router.post('/upload', function(req,res,next){
  //Khởi tạo form
  var form =  new formidable.IncomingForm();
  //Thiết lập thư mục chứa file trên server
  form.uploadDir = "uploads/";
  //xử lý upload
  form.parse(req,function (err, fields, file) {
    //path tmp trên server
    var path = file.files.path;
    //thiết lập path mới cho file
    fs.readFile(path,'utf8',function (err,data) {
      if (err) throw err;
      res.send(data);
    });
    var newpath = form.uploadDir + file.files.name;
    fs.rename(path, newpath, function (err) {
      if (err) throw err;
    });
  });
});

router.get('/result', function(req,res,next){
  res.render('result');
  fs.readFile(newpath,'utf8',function (err,data) {
    if (err) throw err;
    res.write(data);
  });
});

module.exports = router;

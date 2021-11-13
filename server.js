var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer  = require('multer');

//dest указывает, куда сохранять файлы. После отправки формы с файлом в папке uploads появитс новый файл. Первый отправляемый через форму файл создаст папку uploads
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//в upload.single() вставляю name файла в input 
//api/fileanalyse = path в атрибуте action тега form
 app.post("/api/fileanalyse", upload.single('upfile'),(req,res)=>{
   res.send({name:req.file.originalname,
   type:req.file.mimetype,
   size:req.file.size})
 });

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('dotenv').config();
console.log("Hello World");

// app.get("/",function(req,res){
//   res.send("Hello Express");
// })
app.use('/public',express.static(__dirname+'/public'));
app.use('/name',bodyParser.urlencoded({extended:false}));

app.use(function logger(req,res,next){
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
})

app.get('/',function(req,res){
  filePath = __dirname+"/views/index.html";
  res.sendFile(filePath);
})


app.get('/json',(req,res)=>{
  if (process.env.MESSAGE_STYLE==="uppercase"){
    res.json({
      message: "Hello json".toUpperCase()
    });
  }
    res.json({
      message: "Hello json"
      });
})

app.get('/now',function(req,res,next){
  req.time = new Date().toString();
  next();
},function(req,res){
  res.json({
    time : req.time
  })
})

app.get('/:word/echo',function(req,res){
  word = req.params.word
  res.json({
    echo: word
  })
})

app.get('/name',(req,res)=>{
  firstname = req.query.first;
  lastname = req.query.last;
  res.json({
    name: firstname +" "+ lastname
  })
})

app.post('/name', (req,res)=>{
  firstname = req.body.first;
  lastname = req.body.last;
  res.json({
    name: firstname+" "+lastname
  })
})

module.exports = app;

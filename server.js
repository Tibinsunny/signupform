var express=require("express"); 
var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg', {useNewUrlParser: true, useUnifiedTopology: true});
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  
var app=express() 
  
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup_success.html'); 
}) 
  
  
app.get('/',function(req,res){ 
return res.redirect('index.html'); 
})
app.get('/main',function(req,res){ 
    var cursor = db.collection('details').find();

    cursor.each(function(err, doc) {

        res.write("Hai Check log for database");
        console.log(doc)
              
    }); 
     
    })

.listen(3000) 
  
  
console.log("server listening at port 3000"); 
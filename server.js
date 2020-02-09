var express=require("express"); 
var bodyParser=require("body-parser");
var app=express() 
app.set('view engine','ejs')
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg', {useNewUrlParser: true, useUnifiedTopology: true});
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  

  
  
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
    app.post('/login',function(req,res){ 
        var name = req.body.name; 
        var email =req.body.password; 
        db.collection('details').findOne({name:name, email:email}, function(err,result)
        {
            if(result==null)
            {
            console.log("User not found.")
            }
            else
            {
            console.log("Login Successful")
            res.render('dashboard',{name:result.name}); 
            }
        })
    
         
        })
             
           
        app.get('/login',function(req,res){ 
           
            return res.redirect('login.html'); 
             
            })

.listen(3000) 
  
  
console.log("server listening at port 3000"); 
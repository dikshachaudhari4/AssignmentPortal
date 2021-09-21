const express = require("express");
const app = express();
const date = require('date-and-time')
const path = require("path");
const port = process.env.PORT || 3000;
var bodyParser=require("body-parser");
require("./db/conn");
const submission = require("./models/store");
const {json, response} = require("express");
const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")

const multer = require('multer');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path)

app.get("/",(req,res)=>{
    res.render("index");
});

//storge for uploaded file
const storage = multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'./public/uploads');
    },

    //add back extention
    filename:function(request,file,callback){
        callback(null,file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits:{
        fileSize:1024*1024*3,
    },
});


app.post("/assignment", upload.single('sub_file'),async(req,res) => {
    try{
        const stdsub = new submission({
            rollno:req.body.rollno,
            name:req.body.name,
            email:req.body.email,
            year:req.body.year,
            branch:req.body.branch,
            subject:req.body.subject,
            ass_no:req.body.ass_no,
           // file:req.file.filename,
        })
        const submitted=await stdsub.save();
        res.status(201).render("index");
    }
    catch(error){
        
        res.status(400).send(error);
    }
    
});

app.get("/viewsub", async(req,res) => {
    submission.find((err,docs)=>{
        if(!err){
            res.render("assignment",{
                list: docs
            });
        }
        else{
            console.log(err);
        }
    });
});
app.get("/login", (req,res) => {    
    res.sendFile(template_path+"/login.html");
});

app.listen(port , () => {
    console.log("server is running!!!");
})


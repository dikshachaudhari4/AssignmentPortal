const mongoose = require("mongoose");

const stdSchema = new mongoose.Schema({
    rollno:{
        type:String,
        required:"This Field is Required"
    },
    name:{
        type:String,
        required:"This Field is Required"
    },
    email:{
        type:String,
        required:"This Field is Required"
    },
    year:{
         type:String,
         required:"This Field is Required"
    },
    branch:{
        type:String,
        required:"This Field is Required"
    },
    subject:{
        type:String,
        required:"This Field is Required"
    },
    ass_no:{
        type:Number,
        required:"This Field is Required"
    }
},
{
    timestamps:new Date()
}
)

const submission = new mongoose.model("Submission",stdSchema);
module.exports = submission;
const  mongoose = require("mongoose")
const mongoDbURL = process.env.MONGODB_URL || "mongodb://localhost:27017/StdSubmission"
mongoose.connect(mongoDbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("connection successful");
}).catch((e) => {
    console.log(e);
})
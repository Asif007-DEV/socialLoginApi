const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     email:{
//         type: String,
//         required : true
//     },
//     username:{
//         type:String,
//         required:true,
//     }
// });

const fUserSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
});




module.exports = mongoose.model("facebookUser",fUserSchema);
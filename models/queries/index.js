const facebookModel = require("../schemas/user");

let userObject ={};

userObject.getUser = function(id){
    return facebookModel.findOne({userID:id});
}

userObject.addUser = function(id, username){
    const newUser = new facebookModel({
        userID:id,
        username: username
    });
    return newUser;
}
module.exports = userObject;
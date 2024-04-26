const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        min:8,
    },
    isAvaterImageSet : {
        type: Boolean,
        default: false,
    },
    avatarImage:{
        type: String,
        default:"",
    },
    // isAdmin:{
    //     type:Boolean,
    //     default:false,
    // },
    // isVerified:{
    //     type:Boolean,
    //     default:false,
    // },
    // isBlocked:{
    //     type:Boolean,
    //     default:false,
    // },
    // isDeleted:{
    //     type:Boolean,
    //     default:false,
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,

    // },  

});
module.exports = mongoose.model("Users", userSchema);
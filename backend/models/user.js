const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    avatar: {
        type:String,
        default:"https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg",
    },
    role: {
        type:String,
        default: "user",
        enum: ["user","admin"],
    },
    favourites:[
        {
        type:mongoose.Types.ObjectId,
        ref: "books",
        },
],
    cart:[
    {
    type:mongoose.Types.ObjectId,
    ref: "books",
    }
],
    orders:[
    {
    type:mongoose.Types.ObjectId,
    ref: "orders",
    }
],
},
{timestamps: true}
);
module.exports = mongoose.model("user",user);
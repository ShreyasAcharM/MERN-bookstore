const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

router.post("/sign-up", async (req,res) => {
    try {
        const {username,email,password,address} = req.body;
        if(username.length < 4){
            return res.status(400).json({message:"username too short < 4"});
        }
        const existingUserName = await User.findOne({username:username});
        if(existingUserName){
            return res.status(400).json({message:"username exists"});
        }
        const existingEmail = await User.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({message:"email exists"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"password too short < 6"});
        }
        const hashPass =  await bcrypt.hash(password, 10);
        const newUser = new User({
            username:username,
            email:email,
            password:hashPass,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({message:"user signed in"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
})

router.post("/sign-in",async (req,res) => {
    try {
        const {username,password} = req.body;
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return res.status(400).json({message:"wrong user"});
        }
        const isMatch = await bcrypt.compare(password,existingUser.password);
        if(isMatch){
            const authClaims = [{name:existingUser.username},{role:"existingUser.role"}];
            const token = jwt.sign({authClaims},"bookstore123",{expiresIn:"30d"})
            return res.status(200).json({message:"logged In successfully", id:existingUser._id,role:existingUser.role,token:token});
        }else{
            return res.status(400).json({message:"wrong pass"});
        }
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
})

router.get("/get-user-information",authenticateToken, async (req,res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});

router.put("/update-address",authenticateToken,async (req,res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
})
module.exports = router;
const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book")
const { authenticateToken } = require("./userAuth");

router.post("/add-book",authenticateToken, async(req,res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !=="admin"){
            return res.status(400).json({message:"access denied"})
        }
        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        await book.save();
        res.status(200).json({message:"book added"});
    }catch(error){
        res.status(500).json({message:"ingternal server error"});
    }
});

router.put("/update-book/:bookid",authenticateToken,async (req,res) => {
    try {
        const {bookid} = req.params;
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        return res.status(200).json({message:"book updated"});
    } catch (error) {
        res.status(500).json({message:"an error occured"});
    }
});

router.delete("/delete-book/:bookid",authenticateToken,async (req,res) => {
    try {
        const {bookid} = req.params;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"book deleted"});
    } catch (error) {
        res.status(500).json({message:"an error occured"});
    }
});

router.get("/get-all-books",async(req,res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        return res.json({status:"success",data:books});
    } catch (error) {
        res.status(500).json({message:"an error occured"})
    }
});

router.get("/get-recent-books",async(req,res) => {
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({status:"success",data:books});
    } catch (error) {
        res.status(500).json({message:"an error occured"})
    }
});

router.get("/get-book-by-id/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({status:"success",data:book});
    } catch (error) {
        res.status(500).json({message:"an error occured"})
    }
});
module.exports = router;
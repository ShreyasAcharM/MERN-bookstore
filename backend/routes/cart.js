const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

router.put("/add-to-cart",authenticateToken,async(req,res) => {
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart){
            return res.json({
                status:"Success",
                message:"book already in the cart",
            });
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid}
        });
        return res.json({
            status:"success",
            message:"book added to cart"
        });
    } catch (error) {
        res.status(500).json({message:"an error occured"});
    }
})

router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res) => {
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart){
            await User.findByIdAndUpdate(id, {$pull: {cart:bookid}});
        }
        return res.status(200).json({message:"book removed from cart"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});

router.get("/get-cart",authenticateToken,async(req,res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status:"success",
            data:cart,
        });
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});

module.exports = router;
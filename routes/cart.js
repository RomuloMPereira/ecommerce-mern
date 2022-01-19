const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization2 } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ id: req.params.id });
        if (req.user.id === cart.userId || req.user.isAdmin) {
            const updatedCart = await Cart.findByIdAndUpdate(
                cart.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedCart);
        } else {
            res.status(401).json("You are not authenticated!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ id: req.params.id });
        if (req.user.id === cart.userId || req.user.isAdmin) {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json("Cart has been deleted...");
        } else {
            res.status(401).json("You are not authenticated!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
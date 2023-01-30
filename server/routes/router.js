const express = require("express");
const router = express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// getproductsdata api
router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error" + error.message);
    }
})


// get indivisual data
router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const individualdata = await Products.findOne({ id: id });
        // console.log(individualdata + "individual id");
        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(error);
        // console.log("error" + error.message);
    }
});
// POST REQUEST registeration data
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;
    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill all the data" });
        console.log("no data availible");
    };
    try {
        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "this user is already present" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password and cpassword do not match" })
        } else {
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });
            const storedata = await finalUser.save();
            console.log(storedata);
            res.status(201).json(storedata);
        }
    } catch {
        console.log("error at registration time" + error.message);
        res.status(422).send(error);
    }
});
// login user api
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "fill all the data" })
    }
    try {
        const userlogin = await USER.findOne({ email: email })
        console.log(userlogin + "user value")
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            // console.log(isMatch);
            //  token generation
            const token = await userlogin.generateAuthtoken();
            // console.log(token);
            res.cookie("Amazonweb", token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            })
            if (!isMatch) {
                res.status(400).json({ error: "invalid details" })
            } else {
                res.status(201).json(userlogin)
            }
        } else {
            res.status(400).json({ error: "invalid details" })
        }
    } catch (error) {
        res.status(400).json({ error: "invalid details" })
    }
})

// adding data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart + "cart value");
        const userContact = await USER.findOne({ _id: req.userID });
        console.log(userContact);
        if (userContact) {
            const cartData = await userContact.addcartdata(cart);
            await userContact.save();
            console.log(cartData);
            res.status(201).json(userContact);
        } else {
            res.status(401).json({ error: "invalid user" });
        }

    } catch (error) {
        res.status(401).json({ error: "invalid user" });
    }
})
// get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID })
        res.status(201).json(buyuser);
        // console.log("success");
    } catch (error) {
        console.log("error" + error)
    }
})

// get valid user
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validuser = await USER.findOne({ _id: req.userID })
        res.status(201).json(validuser);
        // console.log("success");
    } catch (error) {
        console.log("error" + error)
    }
})
// remove item from cart
router.delete("/remove/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((cremoval)=>{
            return cremoval.id != id;
        })
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item remove");
    } catch (error) {
        console.log("error"+error);
        res.status(400).json(req.rootUser);
    }
})
// logout api
router.get("/logout",authenticate,(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        })
        res.clearCookie("Amazonweb",{path:"/"})
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");
    } catch (error) {
        console.log("error for user logout");
    }
})
module.exports = router;
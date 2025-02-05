const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const app = express()

//signup
app.post('/signup', async(req,res)=> {
    try{
    //username,firstname,lastname,password
    const {username, fname, lname, password} = req.body;

    //check for user in database
    let user = await User.findOne({userName});
    if(user){
        return res.status(400).json({message: "User already exists"})
    }

    // hash password

    const hashpwd = await bcrypt.hash(password,10);

    // new user
    user = new User({username, fname, lname, hashpwd})
    await user.save();
    }catch (err){
        res.status(500).json({message: "error",err})
        console.log(err)
    }
})

//login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Store user ID in session
        req.session.userId = user._id;

        res.json({ message: "Login successful", user: { id: user._id, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


module.exports = app;

const User = require('../models/User');
const JWT = require('jsonwebtoken');
const res = require('express/lib/response');


const handleError = (err) => {

    const errors = { message: "" };

    if (err.code === 11000) {
        errors.message = "Email already exists";
    }
    if (err.message === "User not found") {
        errors.message = "User not found";
    }
    if (err.message === "incorrect password") {
        errors.message = "Incorrect password";
    }
    if (err.message.includes("Password must be at least 6 characters")) {
        errors.message = "Password must be at least 6 characters";
    }


    if (err.errors) {
        if (err.errors.username) {
            if (err.errors.username.message === "Username is required") {
                errors.message = "Username is required";
            }
        }

        if (err.errors.fullname.message === "Fullname is required") {
            errors.message = "Fullname is required";
        }
    }


    return errors;
}

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return JWT.sign({ id }, "kidsseeghosts", { expiresIn: maxAge });
}


module.exports.post_signup = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const newuser = await User.create({ email, username, password });
        const token = createToken(newuser._id);
        return res.status(201).json({ newuser, "message": "Signup successful", "success": true, "token": token });
    }
    catch (err) {
        const errors = handleError(err);
        console.log(err)
        return res.status(400).json({ errors, "success": false });
        // return res.json({ err, "success": false });
    }
}
module.exports.post_signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        return res.status(200).json({ user, "success": true, "message": "Signin successful", "token": token });
    }
    catch (err) {
        console.log(err)
        const errors = handleError(err);
        return res.status(400).json({ errors, "success": false });


    }
}

module.exports.get_users = async (req,res) => {
    try{
        const users = await User.find({});
        return res.status(201).json({users,"success":true})
    }
    catch{
        return res.status(400).json({"message":"cannot fetch users","success":false})
    }
}
const JWT = require('jsonwebtoken');
const multer = require('multer')
const path = require('path');
const supabase = require('../constants/supabase');
const bcrypt = require('bcrypt')
require('dotenv').config();


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./Images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//         // console.log(file)
//     }
// })

// const upload = multer({ storage: storage })


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
            errors.message = "FullName is required";
        }
    }


    return errors;
}

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

module.exports.post_signup = async (req, res) => {
    const { email, username, password, fullname } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const newPass = await bcrypt.hash(password, salt);
        const { error } = await supabase.from('users').insert({ fullname, email, username, password: newPass })

        if (!error) {
            return res.status(200).json({ "message": "Signup successful", "success": true });
        } else {
            return res.status(400).json({ "message": error.details, "success": false });
        }
    }
    catch (err) {
        // const errors = handleError(err);
        console.log(err)
        return res.status(400).json({ errors, "success": false });
        // return res.json({ err, "success": false });
    }
}
module.exports.post_signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = createToken(email);
        const { data } = await supabase.from('users').select().eq('email', email);
        console.log(data)
        if (data.length >= 1) {

            const isValid = await bcrypt.compare(password, data[0]?.password);
            if (isValid) {
                return res.status(200).json({ "success": true, "message": "Signin successful", "token": token });
            }
            else {
                throw new Error('incorrect password');
            }
        }
        else {
            throw new Error('User not found');
        }


    }
    catch (err) {
        console.log(err)
        const errors = handleError(err);
        return res.status(400).json({ errors, "success": false });
    }
}

module.exports.get_users = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select();
        return res.status(200).json(data)

    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ "message": "cannot fetch users", "success": false })
    }
}

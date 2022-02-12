const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        unique: true,
        lowercase: true,
    }
    ,
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        lowercase: true,}
    ,
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})
UserSchema.statics.login = async function (email, password) {
    const user = await User.findOne({ email });
    if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return user;
        }
        else {
            throw new Error('incorrect password');
        }
    }
    else {
        throw new Error('User not found');
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;


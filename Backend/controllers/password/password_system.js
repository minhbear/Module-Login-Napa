const Account = require('../../model/accountModel');
const bcrypt = require("bcrypt");
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (payload, secret) => {
    return jwt.sign({payload},  secret, {expiresIn: '15m'})
}

const linkResetPass = async(email) => {
    if(!email){
        throw Error("All fields must be filled");
    }
    
    if(!validator.isEmail(email)){
        throw Error("Invalid Email");
    }
    
    const account = await Account.findOne({ email });
    if(!account){
        throw Error("Incorrect Email");
    }

    //create unique link for user
    //password is hash
    const secret = process.env.JWT_SECRET + account.password;
    const payload = {
        email: account.email,
        id: account._id
    }

    const token = createToken(payload, secret);
    const link = `http://localhost:5000/reset-password/${account._id}/${token}`;

    return link;
}


module.exports = {
    linkResetPass
}


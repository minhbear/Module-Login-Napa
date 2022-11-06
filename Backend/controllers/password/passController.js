const Account = require('../../model/accountModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { linkResetPass } = require('./password_system');
const { sendEmail } = require('../../utils/sendEmail');

//forgot password
const forgotPassword = async(req, res, next) => {
    try {
        const {email} = req.body;
        const link = await linkResetPass(email);

        await sendEmail(email, "Password Reset Link", link);
        // console.log(link);

        res.status(200).json({message: "password reset link sent to your email account" });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//reset password
const resetPassword = async(req, res, next) => {
    try {
        const { id, token } = req.params;
        const { oldPassword, newPassword } = req.body;

        const account = await Account.findById(id);
        if(!account){
            throw Error("Not valid id");
        } 

        const secret = process.env.JWT_SECRET + account.password;
        const payload = jwt.verify(token, secret);

        const match = await bcrypt.compare(oldPassword, account.password);

        if(!match){
            throw Error("Incorrect old password");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const updateAccount = await Account.updateOne({ _id: id }, { password: hash });

        res.status(200).json({message: "change password success"});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    forgotPassword,
    resetPassword
}
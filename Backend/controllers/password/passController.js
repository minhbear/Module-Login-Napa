const Account = require('../../model/accountModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { linkResetPass, updatePassword } = require('./passService');
const { sendEmail } = require('../../services/sendEmail');

//forgot password
const forgotPassword = async(req, res, next) => {
    try {
        const {email} = req.body;
        const link = await linkResetPass(email);

        // console.log(link);
        await sendEmail(email, "Password Reset Link", link);

        res.status(200).json({message: "password reset link sent to your email account", link });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//reset password
const resetPassword = async(req, res, next) => {
    try {
        const { id, token } = req.params;
        const { oldPassword, newPassword } = req.body;
        const updateAccount = await updatePassword(id, token, oldPassword, newPassword);

        res.status(200).json({message: "change password success"});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    forgotPassword,
    resetPassword
}
const jwt = require('jsonwebtoken');
const { signup, login } = require('./login-signup');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

//login
const loginAccount = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const account = await login(email, password);

        const token = createToken(account._id);
        res.status(200).json({username: account.username, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//signup
const signupAccount = async(req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const account = await signup(username, email, password);

        const token = createToken(account._id);

        res.status(200).json({username, email, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    signupAccount,
    loginAccount
}
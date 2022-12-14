const Account = require('../../model/accountModel');
const bcrypt = require("bcrypt");

//signup method
const signup = async function(username, email, password){
    const exists = await Account.findOne({ email });

    if(exists) {
        throw Error("Email already had");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newAccount = await Account.create({ username, email, password: hash, role: 0, status: 1 });

    return newAccount;
}

//login method
const login = async function(email, password) {
    const account = await Account.findOne({ email });

    if(!account){
        throw Error("Incorrect Email");
    }

    if(account.status === 0){
        throw Error("This account is not active");
    }

    //compare password
    const match = await bcrypt.compare(password, account.password);

    if(!match){
        throw Error("Incorrect password");
    }

    return account;
}

module.exports = {
    signup,
    login
}

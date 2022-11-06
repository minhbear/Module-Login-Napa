const bcrypt = require("bcrypt");

const { isAdmin, canViewAccount } = require('../permissions/accounts');
const Account = require('../model/accountModel');
const GithubAccount = require('../model/githubModel')

const canGetAllAccounts = async (req, res, next) => {
    try {
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const accounts = await Account.find();
            const githubAccounts = await GithubAccount.find();

            res.status(200).json({accounts, githubAccounts})
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

const viewAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!canViewAccount(account, id)){
            res.status(401).json({message: "Not allowed"});
        }else{
            let account = await Account.findById(id);
            if(account === null){
                account = await GithubAccount.findById(id)
            }
            res.json(account);
        }
        
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

const updateAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const {username, email, password, role} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const updateAccount = await Account.findOneAndUpdate({_id: id}, {"$set": {
                username, 
                email,
                password: hash,
                role 
            }});

            res.status(200).json({message: "Update success"});
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            await Account.findByIdAndDelete(id);

            res.status(200).json({message: "delete success"});
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

const deleteGithubAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            await GithubAccount.findByIdAndDelete(id);

            res.status(200).json({message: "delete success"});
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

const activeAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const {status} = req.body;
            const statusAccount = await Account.updateOne({_id: id}, {status: status});

            res.status(200).json({message: "change status account success"});
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

const activeGithubAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const {status} = req.body;
            const statusAccount = await GithubAccount.updateOne({_id: id}, {status: status});

            res.status(200).json({message: "change status account success"});
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
}

module.exports = {
    canGetAllAccounts,
    viewAccount,
    updateAccount,
    deleteAccount,
    deleteGithubAccount,
    activeAccount,
    activeGithubAccount
}
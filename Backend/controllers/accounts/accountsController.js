const bcrypt = require("bcrypt");

const { isAdmin, canViewAccount } = require('../../permissions/accounts');
const Account = require('../../model/accountModel');
const GithubAccount = require('../../model/githubModel')

const {
    getAllAccounts, 
    findAccount,
    updateAccountFields,
    deleteAccountById,
    activeAccountById
} = require('./accountsService');

const canGetAllAccounts = async (req, res, next) => {
    try {
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const listAccounts = await getAllAccounts();

            res.status(200).json(listAccounts);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const viewAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!canViewAccount(account, id)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const account = await findAccount(id);
            res.status(200).json(account);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
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
            const update = await updateAccountFields(username, email, password, role, id);

            res.status(200).json({message: "Update success"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const deleteAccount = await deleteAccountById(id, "account");

            res.status(200).json({message: "delete success"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const deleteGithubAccount = async (req, res, next) => {
    try {
        const {id} = req.params;
        const account = req.account;
        if(!isAdmin(account.role)){
            res.status(401).json({message: "Not allowed"});
        }else{
            const deleteAccount = await deleteAccountById(id, "githubAccount");

            res.status(200).json({message: "delete success"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
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
            const activeAccount = await activeAccountById(id, "account", status);
            res.status(200).json({message: "change status account success"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
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
            const activeAccount = await activeAccountById(id, "githubAccount", status);
            

            res.status(200).json({message: "change status account success"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
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
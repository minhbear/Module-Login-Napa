const express = require('express');

const { requireAuth } = require('../middleware/requireAuth');

const { 
    canGetAllAccounts, 
    viewAccount, 
    updateAccount, 
    deleteAccount,
    deleteGithubAccount,
    activeAccount,
    activeGithubAccount 
} = require('../controllers/accounts')

const router = express.Router();

router.use(requireAuth);

//list all accounts
router.get('/', canGetAllAccounts);

//get single accounts
router.get('/:id', viewAccount);

//update accounts
router.post('/update/:id', updateAccount);

//delete accounts
router.delete('/delete/:id', deleteAccount);

//delete github account
router.delete('/delete/github/:id', deleteGithubAccount);

// active/inactive accounts
router.post('/active/:id', activeAccount);

// active/inactive accounts
router.post('/active/github/:id', activeGithubAccount);

module.exports = router;
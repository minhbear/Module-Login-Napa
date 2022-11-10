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
} = require('../controllers/accounts/accountsController')
const {updateAccountValidator, viewAccountValidator, activeAccountValidator} = require('../controllers/accounts/accounts.dto');

const router = express.Router();

router.use(requireAuth);

//list all accounts
router.get('/', canGetAllAccounts);

//get single accounts
router.get('/:id', viewAccountValidator,viewAccount);

//update accounts
router.post('/update/:id',viewAccountValidator ,updateAccountValidator, updateAccount);

//delete accounts
router.delete('/delete/:id',viewAccountValidator ,deleteAccount);

//delete github account
router.delete('/delete/github/:id',viewAccountValidator ,deleteGithubAccount);

// active/inactive accounts
router.post('/active/:id',viewAccountValidator, activeAccountValidator ,activeAccount);

// active/inactive accounts
router.post('/active/github/:id',viewAccountValidator, activeAccountValidator ,activeGithubAccount);

module.exports = router;
const express = require('express');

const { forgotPassword } = require('../controllers/password/passController');
const {forgotPassValidator} = require('../controllers/password/pass.dto');

const router = express.Router();

//forgot password
router.post('/',forgotPassValidator, forgotPassword);

module.exports = router;
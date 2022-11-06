const express = require('express');

const { forgotPassword } = require('../controllers/password/passController');

const router = express.Router();

//forgot password
router.post('/', forgotPassword);

module.exports = router;
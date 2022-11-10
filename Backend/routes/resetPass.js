const express = require('express');

const { resetPassword } = require('../controllers/password/passController');
const { resetPassValidator } = require('../controllers/password/pass.dto');

const router = express.Router();

//reset pass
router.post('/:id/:token', resetPassValidator, resetPassword);

module.exports = router;
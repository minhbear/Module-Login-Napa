const express = require('express');

const { resetPassword } = require('../controllers/password/passController');

const router = express.Router();

//reset pass
router.post('/:id/:token', resetPassword);

module.exports = router;
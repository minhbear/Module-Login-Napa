const express = require("express");

const {signupAccount, loginAccount} = require("../controllers/auth/auth.Controller");
const { loginByGithub } = require("../controllers/auth/github.Controller");
const {signupValidator, loginValidator} = require('../controllers/auth/auth.dto');

const router = express.Router();

router.post("/login", loginValidator, loginAccount);

router.post("/signup", signupValidator, signupAccount);

router.get("/github", (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENTID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`;

  res.redirect(url);
});

router.get("/github/callback", loginByGithub);

module.exports = router;

const {getAccessToken, getGithubUser, createGithubAccount} = require('./githubService')
const {createToken} = require('./createToken')

const loginByGithub = async (req, res, next) => {
  const code = req.query.code;
  try {
    const token = await getAccessToken(code);
    const githubData = await getGithubUser(token);
    const account = await createGithubAccount(githubData);

    const tokenGithub = createToken(account._id);
    res.status(200).json({ message: "login success", token: tokenGithub, username: account.username, email: account.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginByGithub
};

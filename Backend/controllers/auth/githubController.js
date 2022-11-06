const fetch = require("node-fetch");
const GithubAccount = require("../../model/githubModel");

const getAccessToken = async (code) => {
  const result = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENTID,
      client_secret: process.env.GITHUB_CLIENTSECRET,
      code: code,
    }),
  });

  const data = await result.text();
  const params = new URLSearchParams(data);
  return params.get("access_token");
};

const getGithubUser = async (access_token) => {
  const req = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });

  const data = await req.json();
  return data;
};

const loginByGithub = async (req, res, next) => {
  const code = req.query.code;
  try {
    const token = await getAccessToken(code);
    const githubData = await getGithubUser(token);
    if (githubData) {
      const githubEmail = githubData.email;
      const account = await GithubAccount.findOne({ email: githubEmail });

      if (!account) {
        const newAccount = await GithubAccount.create({
          username: githubData.login,
          email: githubEmail,
          role: 0,
          status: 1,
        });
      } else {
        if (account.status === 0) {
          throw Error("This account is not active");
        }
      }
    }

    res.status(200).json({ message: "login success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginByGithub
};

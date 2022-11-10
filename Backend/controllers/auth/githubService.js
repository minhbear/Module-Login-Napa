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

const createGithubAccount = async (githubData) => {
  const githubEmail = githubData.email;
  let account = await GithubAccount.findOne({ email: githubEmail });

  if (!account) {
    account = await GithubAccount.create({
      username: githubData.login,
      email: githubEmail,
      role: 0,
      status: 1,
    });
  }

  return account;

};

module.exports = {
  getAccessToken,
  getGithubUser,
  createGithubAccount
};

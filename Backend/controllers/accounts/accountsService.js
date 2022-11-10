const bcrypt = require("bcrypt");

const Account = require("../../model/accountModel");
const GithubAccount = require("../../model/githubModel");

const getAllAccounts = async () => {
  const accounts = await Account.find();
  const githubAccounts = await GithubAccount.find();

  return { accounts, githubAccounts };
};

const findAccount = async (id) => {
  let account = await Account.findById(id);
  if (account === null) {
    account = await GithubAccount.findById(id);
  }

  return account;
};

const updateAccountFields = async (username, email, password, role, id) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const updateAccount = await Account.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        username,
        email,
        password: hash,
        role,
      },
    }
  );

  return updateAccount;
};

const deleteAccountById = async (id, model) => {
    let deleteAccount;

    switch(model) {
        case "account":
            deleteAccount = await Account.findByIdAndDelete(id);
            break;
        case "githubAccount":
            deleteAccount = await GithubAccount.findByIdAndDelete(id);
            break;
    }

    return deleteAccount
}

const activeAccountById = async(id, model, status) => {
    let activeAccount;
    switch(model) {
        case "account":
            activeAccount = await Account.updateOne({_id: id}, {status: status});
            break;
        case "githubAccount":
            activeAccount = GithubAccount.updateOne({_id: id}, {status: status});
            break;
    }

    return activeAccount
}

module.exports = {
  getAllAccounts,
  findAccount,
  updateAccountFields,
  deleteAccountById,
  activeAccountById
};

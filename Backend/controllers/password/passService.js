const Account = require("../../model/accountModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (payload, secret) => {
  return jwt.sign({ payload }, secret, { expiresIn: "15m" });
};

const createSecret = (password) => {
  return process.env.JWT_SECRET + password;
};

const linkResetPass = async (email) => {
  const account = await Account.findOne({ email });
  if (!account) {
    throw Error("Incorrect Email");
  }

  //create unique link for user
  //password is hash
  const secret = createSecret(account.password);
  const payload = {
    email: account.email,
    id: account._id,
  };

  const token = createToken(payload, secret);
  const link = `http://localhost:5000/reset-password/${account._id}/${token}`;

  return link;
};

const updatePassword = async (id, token, oldPassword, newPassword) => {
  const account = await Account.findById(id);
  if (!account) {
    throw Error("Not valid id");
  }

  const secret = createSecret(account.password);
  const payload = jwt.verify(token, secret);

  const match = await bcrypt.compare(oldPassword, account.password);

  if (!match) {
    throw Error("Incorrect old password");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  const updateAccount = await Account.updateOne(
    { _id: id },
    { password: hash }
  );

  return updateAccount;
};

module.exports = {
  linkResetPass,
  updatePassword,
};

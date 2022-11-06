const isAdmin = (role) => {
    return role === 1;
}

const canViewAccount = (account, id) => {
    return account.role === 1 ||
        String(account._id) === id
}

module.exports = {
    isAdmin,
    canViewAccount
}
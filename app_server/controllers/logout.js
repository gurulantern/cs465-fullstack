const logoutUser = async (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/');
};

module.exports = {
  logoutUser
};

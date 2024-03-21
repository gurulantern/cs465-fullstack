// When called from JS script in login.hbs, cookie is cleared
const logoutUser = async (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/');
};

module.exports = {
  logoutUser
};

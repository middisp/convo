exports.getLogin = (req, res, next) => {
  res.render('login', { pageTitle: 'Login' });
}

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
};
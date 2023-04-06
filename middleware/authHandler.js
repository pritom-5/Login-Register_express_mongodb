const authHandler = (req, res, next) => {
  const auth = req.session;

  if (auth.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = authHandler;

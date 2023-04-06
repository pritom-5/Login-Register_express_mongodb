const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new Error("Something went wrong");
    } else {
      res.redirect("/");
    }
  });
};

module.exports = logout;

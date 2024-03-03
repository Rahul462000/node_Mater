const { getUSer } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");
  const user = getUSer(userUid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUSer(userUid);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUserOnly, checkAuth };

const { getUSer } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid; //1.
  if (!userUid) return res.redirect("/login"); //2.
  const user = getUSer(userUid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid; // ? is putted because of undefined property
  const user = getUSer(userUid);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUserOnly, checkAuth };

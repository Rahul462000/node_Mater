const { getUSer } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie; // extract the token value
  const user = getUSer(token); // verify the token value

  req.user = user;
  return next();
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid; //1.
//   const userUid = req.headers["authorization"];
//   if (!userUid) return res.redirect("/login"); //2.
//   const token = userUid.split("Bearer ")[1];
//   const user = getUSer(token);
//   // const user = getUSer(userUid);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid; // ? is putted because of undefined property
//   // console.log(req.headers);
//   const userUid = req.headers["authorization"]; //1.
//   const token = userUid.split("Bearer ")[1];
//   // const user = getUSer(userUid);
//   const user = getUSer(token);
//   req.user = user;
//   next();
// }

// fucntion for role assigning
function restrictTo(roles = []) {
  return function (req, res, next) {
    console.log(req.user);
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UNAuthorized");
    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };

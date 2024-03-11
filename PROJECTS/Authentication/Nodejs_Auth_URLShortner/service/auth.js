// const sessionIdToUserMap = new Map(); // it is a hash map basically only used in stateless authentication
const jwt = require("jsonwebtoken");
const secret = "Notorioussingh";

function setUser(user) {
  // setuser is a function that create the payload and token for new users
  // input got from frontend make it into a payload and return it
  return jwt.sign(
    // this is a payload in object format
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUSer(token) {
  // and getsuer will confirm that this is correct user or not
  // return sessionIdToUserMap.get(id);    this is statefull authentication
  // now the stateless authentication
  // check if token is not present
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUSer,
};

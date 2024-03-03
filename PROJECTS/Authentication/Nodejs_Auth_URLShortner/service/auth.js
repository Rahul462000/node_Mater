const sessionIdToUserMap = new Map(); // it is a hash map basically

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUSer(id) {
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUSer,
};

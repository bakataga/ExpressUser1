const User = require("../models/user");

function userView(User) {
  return `UserId :${User.id},userName: ${User.name}`;
}
module.exports = userView;

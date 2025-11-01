const users = [];

exports.fetchUsers = () => {
  return users;
};

exports.addUser = (user) => {
  users.push(user);
  return user;
};

exports.findUserById = (id) => {
  return users.find(user => user.id === id);
}
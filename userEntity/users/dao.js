import model from "./model.js";

// signup
export const createUser = (user) => model.create(user);

export const findAllUsers = () => model.find();
// see other's profile
export const findUserById = (id) => model.findById(id);

// check whether name already exists at signup
export const findUserByUsername = (username) =>
  model.findOne({ username: username });

// sign in to check whether there is such a user
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

// profile setting
export const updateUser = (id, user) =>
  model.updateOne({ _id: id }, { $set: user });

// export const createUser = (user) => model.create(user);
// export const deleteUser = (id) => model.deleteOne({ _id: id });

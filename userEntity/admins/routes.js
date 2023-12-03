import * as dao from "./dao.js";

// let currentUser = null;

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await dao.findUserById(id);
    res.json(user);
  };
  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.json(user);
  };

  const findUsersByRole = async (req, res) => {
    const role = req.params.role;
    const users = await dao.findUsersByRole(role);
    res.json(users);
  };

  const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUser(id);
    res.json(status);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      const currentUser = user;
      req.session["currentUser"] = currentUser;
      res.json(user);
    } else {
      res.sendStatus(403);
    }
  };
  const signout = async (req, res) => {
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    }
    currentUser = await dao.createUser(req.body);
    res.json(currentUser);
  };

  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    // if (!currentUser) {
    //   res.sendStatus(403);
    //   return;
    // }
    res.json(currentUser);
  };

  app.post("/api/users/signout", signout);
  app.post("/api/users/signin", signin);
  app.post("/api/users/account", account);

  app.delete("/api/users/:id", deleteUser);

  app.get("/api/users/role/:role", findUsersByRole);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username", findByUsername);
  app.get("/api/users/credentials/:username/:password", findUserByCredentials);
}

export default UserRoutes;

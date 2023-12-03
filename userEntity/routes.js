import * as userDao from "./users/dao.js";
import * as adminDao from "./admins/dao.js";
import * as enterpriseDao from "./enterpriseUsers/dao.js";

// let currentUser = null;

function UserRoutes(app) {
  // admin's privillage
  const findAllUsers = async (req, res) => {
    const users = await adminDao.findAllUsers();
    res.json(users);
  };

  // all type pf users can
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
    const { username, role } = req.body;
    let user;
    if (role === "USER") {
      user = await userDao.findUserByUsername(username);
    } else if (role === "ADMIN") {
      user = await adminDao.findUserByUsername(username);
    } else if (role === "ENTERPRISE") {
      user = await enterpriseDao.findUserByUsername(username);
    }
    if (user) {
      res.status(400).json({ message: "Username already existed" });
      return;
    }
    let newUser;
    if (role === "USER") {
      newUser = await userDao.createUser(req.body);
    } else if (role === "ADMIN") {
      newUser = await adminDao.createUser(req.body);
    } else if (role === "ENTERPRISE") {
      newUser = await enterpriseDao.createUser(req.body);
    }
    res.json(newUser);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    // if (!currentUser) {
    //   res.sendStatus(403);
    //   return;
    // }
    res.json(currentUser);
  };

  app.post("/api/users/signout", signout);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/profile", profile);

  // admin's
  app.get("/api/users", findAllUsers);

  app.get("/api/users/:id", findUserById);
  // click on the name, redirect to the user's profile
  app.get("/api/users/username/:username", findByUsername);
}

export default UserRoutes;

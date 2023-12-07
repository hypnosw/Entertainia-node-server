import * as Dao from "./dao.js";

// let currentUser = null;

function UserRoutes(app) {
  // admin's privillage
  const findAllUsers = async (req, res) => {
    const users = await Dao.findAllUsers();
    res.json(users);
  };

  // all type pf users can
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await Dao.findUserById(id);
    res.json(user);
  };

  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await Dao.findUserByUsername(username);
    res.json(user);
  };

  const signin = async (req, res) => {
    const { username, password, role } = req.body;
    let user;
    user = await Dao.findUserByCredentials(username, password, role);
    if (user) {
      // const currentUser = user;
      req.session["currentUser"] = user;
      // console.log(req.session["currentUser"]);
      res.json(req.session["currentUser"]);
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
    const { username } = req.body;
    let user;
    user = await Dao.findUserByUsername(username);
    if (user) {
      console.log(user);
      res.status(400).json({ message: "Username already existed" });
      return;
    }
    try {
      let newUser;
      newUser = await Dao.createUser(req.body);
      res.json(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  const profile = async (req, res) => {
    res.json(req.session["currentUser"]);

    // if (!currentUser) {
    //   res.sendStatus(403);
    //   return;
    // }
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await Dao.updateUser(userId, req.body);
    //get the id of current user
    const currentUserId = req.session["currentUser"]._id;
    //also update the current user here
    const currentUser = await Dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    res.json(currentUser);
  };


  app.get("/api/users/signout", signout);
  app.post("/api/users/account", account);
  app.get("/api/users/profile", profile);
  // admin's
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  // click on the name, redirect to the user's profile
  app.get("/api/users/username/:username", findByUsername);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
}

export default UserRoutes;

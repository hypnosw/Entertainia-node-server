import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config.js";
import Entertainia from "./src/entertainia.js";
import UserRoutes from "./userEntity/routes.js";
import PostsRoutes from "./postsEntity/routes.js";
// import LikesRoutes from "./likes/routes.js";

// DB_CONNECTION_STRING should be the remote atlas string, LOCAL is local string
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || process.env.LOCAL_DB_STRING;
mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 86400000,
  },
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
console.log("Hello World!");

// /hello to test if server is working
Entertainia(app);
UserRoutes(app);
PostsRoutes(app);
// LikesRoutes(app);
app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5001}`);
});

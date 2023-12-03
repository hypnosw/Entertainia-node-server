import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || process.env.LOCAL_DB_STRING;
mongoose.connect(CONNECTION_STRING);
const app = express();

app.use(
    cors({   credentials: true,
             origin: process.env.FRONTEND_URL
         }
    )
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
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

app.listen(5000);
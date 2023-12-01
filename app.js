import express from "express";
import cors from "cors";
import session from "express-session";

console.log("Hello World!");

const app = express();

app.use(cors());

app.use(express.json());

app.listen(5000);
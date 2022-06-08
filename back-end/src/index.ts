import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

// initialize configuration
dotenv.config();
const port = process.env.PORT || "5000";

const app: Express = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Hello World </h1>");
});

// dummy api set up to return whatever is in the body back to the use (e.g. to mock api calls in front-end)
app.post("/dummy", (req: Request, res: Response) => {
  res.send(req.body);
});

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

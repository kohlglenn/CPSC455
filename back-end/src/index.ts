import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import userHandler from "./userHandler";

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

app.post("/users", (req: Request, res: Response) => {
  try{
  let id = userHandler.addUser(req.body.name, req.body.email);
  res.send(id);
  }catch (error:any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.get('/users/:user_id', async (req, res) => {
  const userID = req.params.user_id;
  try {
    res.send(userHandler.findUser(userID));
  } catch (error:any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

app.get('/users/login/', async (req, res) => {
  const email = req.body.email;
  const passwd = req.body.password;
  try {
    res.send(userHandler.authenticateUser(email, passwd));
  } catch (error:any) {
    console.error(error.message);
    if (error.message === "Invalid authentication")
      res.status(401).send("Invalid authentication");
    res.status(500).send('Server Error');
  }
});

app.get("/users", (req: Request, res: Response) => {
  res.send(userHandler.getAll());
});

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

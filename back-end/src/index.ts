import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

// initialize configuration
dotenv.config();
const port = process.env.PORT || "5000";

const usersRouter = require("./routes/users");
const restaurantsRouter = require("./routes/restaurants");

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Hello World </h1>");
});

// dummy api set up to return whatever is in the body back to the use (e.g. to mock api calls in front-end)
app.post("/dummy", (req: Request, res: Response) => {
  res.send(req.body);
});

app.use("/restaurants", restaurantsRouter);
app.use("/users", usersRouter);

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

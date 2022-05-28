import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";

// initialize configuration
dotenv.config();
const port = process.env.PORT || "5000";

const app: Express = express();

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Hello World </h1>");
});

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

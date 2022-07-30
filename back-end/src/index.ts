import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";

// initialize configuration
dotenv.config();
const port = process.env.PORT || "5000";

const usersRouter = require("./routes/users");
const restaurantsRouter = require("./routes/restaurants");
const lobbyRouter = require("./routes/lobby");

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../../front-end/build")));

// dummy api set up to return whatever is in the body back to the use (e.g. to mock api calls in front-end)
app.post("/dummy", (req: Request, res: Response) => {
  res.send(req.body);
});

app.use("/restaurants", restaurantsRouter);
app.use("/users", usersRouter);
app.use("/lobby", lobbyRouter);

app.get("*", function (request, response) {
  response.sendFile(
    path.resolve(__dirname, "../../front-end/build", "index.html")
  );
});
// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

import { Request, Router, Response } from "express";
import { stripUser } from "./util";

const queries = require('../db/mongodb').queries;
const router = Router();



/*router.post("/", async (req: Request, res: Response) => {
    try{
    let id = await queries.addUser({
      name:req.body.name,
      email:req.body.email,
      passwordHash:req.body.passwordHash
    });
    res.send(id);
    }catch (error:any) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });*/

router.get('/:user_id', async (req, res) => {
  const userID = req.params.user_id;
  const userToken = req.body.token;
  try {
    let user = await queries.getUser(userID);
    res.send(stripUser(user));
  } catch (error: any) {
    if (error.message === "Invalid Token")
      res.status(401).send("Invalid Token");
    else
      res.status(500).send('Server Error');
    console.error(error.message);
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const passwd = req.body.password;
  try {
    let user = await queries.authenticateUser(email, passwd)
    res.send(stripUser(user));
  } catch (error: any) {
    console.error(error.message);
    if (error.message === "Invalid Login")
      res.status(401).send("Invalid Login");
    else {
      res.status(500).send('Server Error');
    }
  }
});

router.post('/createuser', async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    let user = await queries.addUser(name, email, password);
    res.send(stripUser(user));
  } catch (error: any) {
    console.error(error.message);
    if (error.message === "Existing User")
      res.status(409).send("Email already taken.");
    else if (error.message === "Bad Email")
      res.status(406).send("Email already taken.");
    else {
      res.status(500).send('Server Error');
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  let users = await queries.getAllUsers({});
  res.send(users);
});


module.exports = router;
import { Request, Router, Response } from "express";
import fetch from "node-fetch";

const queries = require('../db/mongodb').queries;
const router = Router();



router.post("/", async (req: Request, res: Response) => {
    try{
    let id = await queries.addUser({name:req.body.name, email:req.body.email, password:req.body.password});
    res.send(id);
    }catch (error:any) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/:user_id', async (req, res) => {
    const userID = req.params.user_id;
    try {
    let user = await queries.getUser(userID);
      res.send(user);
    } catch (error:any) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
  router.post('/login/', async (req, res) => {
    const email = req.body.email;
    const passwd = req.body.password;
    try {
        let user = await queries.authenticateUser(email, passwd)
      res.send(user);
    } catch (error:any) {
      console.error(error.message);
      if (error.message === "Invalid authentication")
        res.status(401).send("Invalid authentication");
      res.status(500).send('Server Error');
    }
  });
  
  router.get("/", async(req: Request, res: Response) => {
    let users = await queries.getAllUsers({});
    res.send(users);
  });


module.exports = router;
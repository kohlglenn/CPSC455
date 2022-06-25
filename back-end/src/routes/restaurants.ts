import { Request, Router } from "express";
import fetch from "node-fetch";

const router = Router();

// TODO: Make caching better, should probably also cache based on lobby id instead of lat/long pair and create a data structure (to include a valid until field and other metadata)
const cache: any = {};

interface Params {
  latitude: string;
  longitude: string;
}

/* GET restaurants listing. */
router.get("/", function (req, res, next) {
  const { latitude, longitude } = req.query as any;
  if (latitude && longitude) {
    if (cache[`${latitude}${longitude}`]) {
      res.send(cache[`${latitude}${longitude}`]);
      return;
    }
    const urlString =
      "https://api.yelp.com/v3/businesses/search?" +
      new URLSearchParams({
        latitude,
        longitude,
      });
    const options = {
      method: "GET",
      headers: {
        Authorization: process.env.YELP_AUTH_KEY || "",
      },
    };
    fetch(urlString, options)
      .then(async (result) => {
        cache[`${latitude}${longitude}`] = await result.json();
        res.send(cache[`${latitude}${longitude}`]);
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send("Failed to request from 3rd part api.");
      });
  } else {
    res.status(400).send("Request must include a latitude and longitude");
  }
});

module.exports = router;

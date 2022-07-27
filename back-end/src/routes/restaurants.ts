import { Request, Router } from "express";
import { Filters, YelpBusinessSearchResponse } from "../models";
import { yelpApiQuery } from "./util";

const router = Router();

interface Params {
  latitude: number;
  longitude: number;
  filters: Filters;
};

/* GET restaurants listing. */
router.get("/", function (req, res, next) {
  const { latitude, longitude, filters: filtersStr } = req.query as any;
  const filters = JSON.parse(filtersStr);
  if (latitude && longitude && filters) {
    yelpApiQuery(String(latitude), String(longitude), filters)
      .then(async (result) => {
        const unfilteredResult = await result.json();
        let filteredBusinesses = unfilteredResult.businesses ? unfilteredResult.businesses.filter((b: YelpBusinessSearchResponse) => {
          return b.rating >= filters.ratingLow && b.rating <= filters.ratingHigh && b.review_count >= filters.reviewCountLow;
        }) : undefined;
        if (filteredBusinesses && filteredBusinesses.length > filters.numberRestaurants)
          filteredBusinesses = filteredBusinesses.slice(0,filters.numberRestaurants);
        res.send({...unfilteredResult, businesses: filteredBusinesses});
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

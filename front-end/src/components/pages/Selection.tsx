import React, {useEffect} from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import sampleData from '../../SampleData.json';
import {useSelector, useDispatch} from 'react-redux';
import { ReduxState } from '../../reducers';
import { GoogleNearbyPlaceResponse, Restaurant } from '../../models';
import { setRestaurants } from '../../actions';
import RestaurantCard, { Props } from '../widgets/RestaurantCard';

function Selection() {
  const restaurants = useSelector((state: ReduxState) => state.restaurants);
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  
  const incrementIndex = () => {
    setIndex((index + 1) % restaurants.length);
  }
  
  useEffect(() => {
    if (restaurants.length === 0) {
      const restaurants = sampleData.results.map((result: GoogleNearbyPlaceResponse) => {
        const restaurant: Restaurant = {
          name: result.name,
          open_now: result.opening_hours.open_now,
          photos: ["https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
          price_level: result.price_level,
          rating: result.rating,
          user_ratings_total: result.user_ratings_total,
          location: result.geometry.location
        };
        return restaurant;
      });
      dispatch(setRestaurants(restaurants));
    }
  }, []);

  return (
    <LayoutWithAppbar>
        {restaurants.map(r => {
          const rProps: Props = {
            img: r.photos[0],
            imgHeight: 400,
            name: r.name,
            rating: r.rating,
            numRating: r.user_ratings_total,
            setIndex: incrementIndex
          };
          return (
            <RestaurantCard {...rProps} />
          );
        })[index]}
    </LayoutWithAppbar>
  );
}

export default Selection;
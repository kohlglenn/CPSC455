import React, {useEffect} from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import sampleData from '../../YelpSampleData.json';
import {useSelector, useDispatch} from 'react-redux';
import { ReduxState } from '../../reducers';
import { Restaurant, YelpBusinessSearchResponse } from '../../models';
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
      const restaurants = sampleData.businesses.map((result: YelpBusinessSearchResponse) => {
        const restaurant: Restaurant = {
          id: result.id as string,
          name: result.name,
          photos: [result.image_url],
          price_level: result.price,
          rating: result.rating,
          user_ratings_total: result.review_count,
          location: result.coordinates
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
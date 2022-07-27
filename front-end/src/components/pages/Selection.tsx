import React, {useEffect} from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import sampleData from '../../YelpSampleData.json';
import {useSelector, useDispatch} from 'react-redux';
import { ReduxState } from '../../reducers';
import { Lobby, Restaurant, YelpBusinessSearchResponse } from '../../models';
import { setLobby, setRestaurants } from '../../actions';
import RestaurantCard, { Props } from '../widgets/RestaurantCard';
import { getLobbyAsync } from '../../models/rest';
import WinnerCard from '../widgets/WinnerCard';

function Selection() {
  const restaurants = useSelector((state: ReduxState) => state.lobby.restaurants);
  const lobby = useSelector((state: ReduxState) => state.lobby);
  const winner = useSelector((state: ReduxState) => state.lobby.winner);
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  
  const incrementIndex = () => {
    setIndex((index + 1));
  }

  useEffect(() => {
    if (restaurants.length > 0 && index === restaurants.length) {
      const interval = setInterval(() => {
        getLobbyAsync(lobby.id).then(res => {
          const newLobby = res[0];
          if (newLobby.winner) {
            dispatch(setLobby(newLobby));
            clearInterval(interval);
          }
        });
      }, 2000);
    }
  }, [index]);

  return (
    <LayoutWithAppbar>
        {winner
        ?
          <WinnerCard {...{
            img: winner.photos[0],
            imgHeight: 400,
            name: winner.name,
            rating: winner.rating,
            numRating: winner.user_ratings_total,
            restaurantId: winner.id,
          }}/>
        : restaurants.length > 0
        ? index < restaurants.length 
        ? restaurants.map(r => {
          const rProps: Props = {
            img: r.photos[0],
            imgHeight: 400,
            name: r.name,
            rating: r.rating,
            numRating: r.user_ratings_total,
            restaurantId: r.id,
            setIndex: incrementIndex
          };
          return (
            <RestaurantCard {...rProps} />
          );
        })[index]
        : "Calculating..."
        : "Loading..."}
    </LayoutWithAppbar>
  );
}

export default Selection;
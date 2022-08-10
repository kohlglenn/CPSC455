import { useDispatch, useSelector } from 'react-redux';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { ReduxState } from '../../reducers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import './UserInfo.css';

export default function UserInfo() {

  const user = useSelector((state: ReduxState) => state.user);
  const [votes, setVotes] = useState<[any[], any[]]>([[], []]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/account')
  }

  function sortFunc(a: any[], b: any[]) {
    if (a[1] === b[1]) {
      return 0;
    }
    else {
      return (a[1] > b[1]) ? -1 : 1;
    }
  }
  useEffect(() => {
    if (user) {
      const upvotes = new Array(Object.entries(user.upvotes))[0];
      const downvotes = new Array(Object.entries(user.downvotes))[0];
      upvotes.sort(sortFunc);
      downvotes.sort(sortFunc);
      setVotes([upvotes, downvotes]);
    }
  }, [user]);
  return (
    (user != null) ?
      <LayoutWithAppbar>
      <div>
      <button className='userinfo-button' onClick={() => handleBack()}>Back to Profile</button>
        <div id='statistics-flexbox'>
          <div className='restaurantHistory'>
            <p id='statsubHeader'>Your Recently<br/>Selected Restaurants:</p>
              {user.restaurantHistory && user.restaurantHistory.map(restaurant => {
              return <h3>{restaurant['name']}</h3>
            })}
          </div>
          <br/>
          <div className='favTypes'>
            <p id='statsubHeader'>Your Favourite<br/>Restaurant Types:</p>
            {votes[0] && votes[0].slice(0, 5).map(vote => {
            return <h3>{vote[0]}, {vote[1]}</h3>
            })}
          </div>
          <div className='nonfavTypes'>
            <p id='statsubHeader'>Your Least Favourite<br/>Restaurant Types:</p>
            {votes[1] && votes[1].slice(0, 5).map(vote => {
              return <h3>{vote[0]}, {vote[1]}</h3>
            })}
          </div>
        </div>
      </div>
      </LayoutWithAppbar>
      : <LayoutWithAppbar />
  );

}

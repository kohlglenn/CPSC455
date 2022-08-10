import { useDispatch, useSelector } from 'react-redux';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { ReduxState } from '../../reducers';
import { useEffect, useState } from 'react';

import './UserInfo.css'

export default function UserInfo() {

  const user = useSelector((state: ReduxState) => state.user);
  const [votes, setVotes] = useState<[any[], any[]]>([[], []]);
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
        <div className='stats-page'>
          <div className='username'>
            <h1>Statistics for {user.name}!</h1>
          </div>
          <div className='restaurantHistory'>
            <h2 id='historyHeader'>Your Past Restaurants</h2>
            <table>
              {user.restaurantHistory && user.restaurantHistory.map(restaurant => {
                return <tr className='historyElement'><td>{restaurant['name']}</td></tr>
              })}
            </table>
          </div>
          <div className='likeTypes'>
            <h2 id='likeHeader'>Your Top Liked Categories</h2>
            <table>
              {votes[0] && votes[0].slice(0, 5).map(vote => {
                return <tr className='likeElement'><td>{vote[0]}</td> <td>{vote[1]}</td></tr>
              })}
            </table>
          </div>
          <div className='dislikeTypes'>
            <h2 id='dislikeHeader'>Your Top Disliked Categories</h2>
            <table>
              {votes[1] && votes[1].slice(0, 5).map(vote => {
                return <tr className='dislikeElement'><td>{vote[0]}</td> <td>{vote[1]}</td></tr>
              })}
            </table>
          </div>
        </div>
      </LayoutWithAppbar>
      : <LayoutWithAppbar />
  );

}
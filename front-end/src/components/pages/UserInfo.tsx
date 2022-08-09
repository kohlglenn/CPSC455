import { useDispatch, useSelector } from 'react-redux';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { ReduxState } from '../../reducers';
import { useEffect, useState } from 'react';

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
        <div className='username'>
          <h1>Welcome back, {user.name}!</h1>
        </div>
        <div className='restaurantHistory'>
          {user.restaurantHistory && user.restaurantHistory.map(restaurant => {
            return <h3>{restaurant['name']}</h3>
          })}
        </div>
        <br/>
        <div className='favTypes'>
        {votes[0] && votes[0].slice(0, 5).map(vote => {
            return <h6>{vote[0]}, {vote[1]}</h6>
          })}
        </div>
        <div className='nonfavTypes'>
        {votes[1] && votes[1].slice(0, 5).map(vote => {
            return <h3>{vote[0]}, {vote[1]}</h3>
          })}
        </div>
      </LayoutWithAppbar>
      : <LayoutWithAppbar />
  );

}
import { useDispatch, useSelector } from 'react-redux';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { ReduxState } from '../../reducers';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserAsync } from '../../models/rest';
import { User } from '../../models';
import { setUser } from '../../actions';

export default function ContactPage() {
  const dispatch = useDispatch();

  const user = useSelector((state: ReduxState) => state.user);
  useEffect(() => {
    if (!user) {
      getUserAsync().then((res: Response) => {
        if (res.ok) {
          return res.json().then((user: User) => {
            dispatch(setUser(user));
          });
        }
      });
    }
  }, []);

  if (user === null) {
    return (
      <LayoutWithAppbar>
        no user!
      </LayoutWithAppbar>
    );
  } else {
    return (
      <LayoutWithAppbar>
        {user.name}<br />
        {user.email}<br />
      </LayoutWithAppbar>
    );
  }
}
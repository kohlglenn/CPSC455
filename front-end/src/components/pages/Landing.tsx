import React, { useEffect } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar';
import LobbyCreation from './LobbyCreation';
import LobbySelection from './LobbySelection';

import {useDispatch, useSelector} from 'react-redux';
import { ReduxState } from '../../reducers';

import {setUser} from '../../actions';
import { User } from '../../models';

function Landing() {

  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    if (!user) {
      const dummyUser: User = {name: "Kohl Peterson", email: "kohlglenn@gmail.com", profileUrl: "https://kohlpeterson.dev/static/921e165bad85f0ec2576f68c44b57e9b/41070/profile.jpg"};
      const url = process.env.REACT_APP_BACKEND + '/dummy';
      fetch(url, {
        body: JSON.stringify(dummyUser),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }}).then((res: Response) => {
          console.log(res);
          if (res.ok) {
            return res.json().then((user: User) => dispatch(setUser(user)));
          }
        });
    }
  }, []);

  return (
    <LayoutWithAppbar>
        Landing
    </LayoutWithAppbar>
  );
}

export default Landing;
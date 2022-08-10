import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { ReduxState } from '../../reducers';
import UserWidget from '../widgets/UserWidget';
import userCookies from '../../models/userCookies';
import { setUser } from '../../actions';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import './AccountInfo.css'

export default function ContactPage() {
  const dispatch = useDispatch();

  const user = useSelector((state: ReduxState) => state.user);

  const navigate = useNavigate();

  const handleLobbyStart = () => {
    navigate('/lobbyselection')
  }
  const handleViewStats = () => {
    navigate('/stats')
  }
  const handleLogOut = () => {
    userCookies.logout();
    navigate('/');
    dispatch(setUser(null));
  }

  if (user === null) {
    return (
      <LayoutWithAppbar>
      <UserWidget/>
      <div className='container'>
        <Typography variant="body1" align="center">
          {'Not logged in! '}
          <Link href="/login">
            Log in here
          </Link>
          </Typography>
      </div>
      </LayoutWithAppbar>
    );
  } else {
    return (
      <LayoutWithAppbar>
        <UserWidget/>
        <div className='container'>
          <h2 id='title-header'>Welcome Back, {user.name}</h2>
          <button className='go2eat-button' onClick={() => handleLobbyStart()}>Go Eat</button>
          <button className='go2eat-button' onClick={() => handleViewStats()}>Statistics</button>
          <button className='go2eat-button' id='logout' onClick={() => handleLogOut()}>Log Out</button>
        </div>
        {/*
        {user.name}<br />
        {user.email}<br />
        */}
      </LayoutWithAppbar>
    );
  }
}

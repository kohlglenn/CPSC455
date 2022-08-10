import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import LayoutWithAppbar from '../layout/LayoutWithAppbar'
import { ReduxState } from '../../reducers';
import UserWidget from '../widgets/UserWidget';

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
          <h2>Welcome Back, {user.name}</h2>
          <button className='go2eat-button' onClick={() => handleLobbyStart()}>Go Eat</button>
        </div>
        {/*
        {user.name}<br />
        {user.email}<br />
        */}
      </LayoutWithAppbar>
    );
  }
}

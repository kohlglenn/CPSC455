import LayoutWithAppbar from '../layout/LayoutWithAppbar'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getUserAsync, userCreateAsync, userLoginAsync } from '../../models/rest';


import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../../actions';
import { User } from '../../models';
import { ReduxState } from '../../reducers';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import UserWidget from '../widgets/UserWidget';
import { Snackbar } from '@mui/material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/kohlglenn/CPSC455/graphs/contributors">
        Go2Eat Team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();
export default function AccountLogin() {

  const [toastMsg, setToastMsg] = useState('');
  const user = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
    };
    userCreateAsync(info).then((res: Response) => {
      if (res.ok) {
        return res.json().then((user: User) => {
          dispatch(setUser(user));
        });
      } else{
        setToastMsg(res.statusText);
      }
    });
    console.log(user);
  };

  if (user !== null){
    return <Navigate to = "/account" />;
  }
  return (
    <LayoutWithAppbar>
    <UserWidget/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item xs>
              {/*
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              deprecated, unless feature added later
              */}
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    <Snackbar
                    open={!!toastMsg}
                    autoHideDuration={6000}
                    onClose={() => {setToastMsg('')}}
                    message={toastMsg}
                />
    </LayoutWithAppbar>
  );
}

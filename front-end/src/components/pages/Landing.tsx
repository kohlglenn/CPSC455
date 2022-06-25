import React, { useEffect, useState } from 'react';
import LayoutWithAppbar from '../layout/LayoutWithAppbar';

import './Landing.css'

import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../reducers';

import { setUser } from '../../actions';
import { User } from '../../models';

import AboutPage from '../widgets/AboutPage';
import { getUserAsync } from '../../models/rest';

function Landing() {

  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    /*if (!user) {
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
    }*/

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

  const [isAboutVisible, setAboutVisible] = useState(false);

  const toggleAbout = () => {
    setAboutVisible(!isAboutVisible);
  }

  const handleCreateClick = () => {

  }

  return (
    <LayoutWithAppbar>
      <div className="landing-page">
        <div className="landing-content">
          <h1 className="landing-title">Go2Eat</h1>
          <h2>Looking for a restaurant?</h2>
          <h3>We can help!</h3>
          <h3>go2eat is a tool designed to help you choose a local <br /> restaurant for a meal, whether in a group or by yourself!</h3>

          <div className="landing-buttons">
            <button className="about-page-button" onClick={() => { toggleAbout() }}>See how it works!</button><br />
            <button className="create-account-button" onClick={() => { handleCreateClick() }}>Create Account</button>
          </div>
        </div>

        <AboutPage show={isAboutVisible} closer={toggleAbout} />

        <img className="landing-image" src={require("./../../logo.png")} />
      </div>

      {/* <LobbyCreation></LobbyCreation> */}

    </LayoutWithAppbar>
  );
}

export default Landing;
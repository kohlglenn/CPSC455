import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './RestaurantCard.css';
import './WinnerCard.css';

import { useSelector } from 'react-redux';
import { ReduxState } from '../../reducers';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

export interface Props {
  img: string;
  imgHeight: number;
  name: string;
  rating: number;
  numRating: number;
  restaurantId: string;
}

// https://mui.com/material-ui/react-card/
export default function MediaCard(props: any) {
  const lobby = useSelector((state: ReduxState) => state.lobby);
  const user = useSelector((state: ReduxState) => state.user);
  
  const {img, imgHeight, name, rating, numRating, setIndex, restaurantId} = props;
  const navigate = useNavigate();
  return (
    <div className="winner-card-wrapper">
      <div className="card-container">
        <Card sx={{ maxWidth: 450 }}>
          <CardMedia
            component="img"
            height={imgHeight}
            image={img}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <span style={{display: "inline-flex", alignItems: "center"}}>
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {`by ${numRating} users`}
            </Typography>
            </span>
          </CardContent>
        </Card>
        <div className="card-button-container">
        <Typography gutterBottom variant="h5" component="div">
          Winner!
        </Typography>
        </div>
      </div>
      <button className='standard-button' onClick={() => window.open(`http://maps.google.com/?q=${name.split(" ").join("+")}`, "_blank")}>Get Directions</button>
      <button className='standard-button' onClick={() => navigate("/lobbyselection")}>Back to Lobby</button>
      <button className='standard-button' onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
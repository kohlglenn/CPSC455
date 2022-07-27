import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './RestaurantCard.css';

import { useSelector } from 'react-redux';
import { ReduxState } from '../../reducers';

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
  return (
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
          <Typography variant="body2" color="text.secondary">
            {`Rating: ${rating} by ${numRating} users`}
          </Typography>
        </CardContent>
      </Card>
      <div className="card-button-container">
      <Typography gutterBottom variant="h5" component="div">
        Winner
      </Typography>
      </div>
    </div>
  );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import './RestaurantCard.css';

import IconButton from './IconButton';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../reducers';
import { Vote } from '../../models';
import { addVoteAsync } from '../../models/rest';
import Rating from '@mui/material/Rating';

export interface Props {
  img: string;
  imgHeight: number;
  name: string;
  rating: number;
  numRating: number;
  restaurantId: string;
  setIndex: () => void;
}

// https://mui.com/material-ui/react-card/
export default function MediaCard(props: any) {
  const lobby = useSelector((state: ReduxState) => state.lobby);
  const user = useSelector((state: ReduxState) => state.user);
  
    const {img, imgHeight, name, rating, numRating, setIndex, restaurantId} = props;
    const handleClick = (e: React.MouseEvent, liked: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        const vote: Vote = {user_id: user._id, restaurant_id: restaurantId, vote: liked ? 'yes' : 'no'};
        addVoteAsync(lobby.id, vote).then(() => {
          setIndex();
        }).catch(() => {
          alert("error processing vote.")
        });
    }
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
          <span style={{display: "inline-flex", alignItems: "center"}}>
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {`by ${numRating} users`}
            </Typography>
          </span>
        </CardContent>
      </Card>
      <div className="card-button-container">
        <IconButton size="6x" style={{color: "green"}} icon={solid("circle-check")} onClick={(e)=>handleClick(e, true)}/>
        <IconButton size="6x" style={{color: "red"}} icon={solid("circle-xmark")} onClick={(e)=>handleClick(e, false)}/>
      </div>
    </div>
  );
}
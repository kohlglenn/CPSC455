import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import './RestaurantCard.css';

import IconButton from './IconButton';

export interface Props {
  img: string;
  imgHeight: number;
  name: string;
  rating: number;
  numRating: number;
  setIndex: () => void;
}

// https://mui.com/material-ui/react-card/
export default function MediaCard(props: any) {
    const {img, imgHeight, name, rating, numRating, setIndex} = props;
    const handleClick = (e: React.MouseEvent, liked: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        if (liked) {
            alert(`Liked ${name}`)
        } else {
            alert(`Disliked ${name}`)
        }
        setIndex();
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
          <Typography variant="body2" color="text.secondary">
            {`Rating: ${rating} by ${numRating} users`}
          </Typography>
        </CardContent>
      </Card>
      <div className="card-button-container">
        <IconButton size="6x" style={{color: "green"}} icon={solid("circle-check")} onClick={(e)=>handleClick(e, true)}/>
        <IconButton size="6x" style={{color: "red"}} icon={solid("circle-xmark")} onClick={(e)=>handleClick(e, false)}/>
      </div>
    </div>
  );
}
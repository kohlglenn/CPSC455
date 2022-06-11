import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RestaurantSharp } from '@mui/icons-material';

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
    <Card sx={{ maxWidth: 345 }}>
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
      <CardActions>
        <Button variant="contained" color="success" onClick={(e)=>handleClick(e, true)}>Like</Button>
        <Button variant="outlined" color="error" onClick={(e)=>handleClick(e, false)}>Dislike</Button>
      </CardActions>
    </Card>
  );
}
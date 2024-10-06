import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGlobalState } from "../../utils/GlobalState";

import { useMutation } from "@apollo/client";
import { ADD_WISH_LIST } from "../../utils/mutation";
import { ADD_TRIP_TO_CART } from "../../utils/actions";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? "rotate(180deg)" : "rotate(0deg)"),
}));

// eslint-disable-next-line react/prop-types
export const TripCard = ({ title, summary, description, img, price, id }) => {
  const [state, dispatch] = useGlobalState();
  console.log(state);
  const [addList, { error }] = useMutation(ADD_WISH_LIST);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToCart = async () => {
    dispatch({
      type: ADD_TRIP_TO_CART,
      payload: { title, img, price, id },
    });
  };

  const addWishTrip = async () => {
    try {
      const { data } = await addList({ variables: { id } });
      console.log("Success:", data);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="trip">
            {title[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`Price: $${price.toFixed(2)}`}
      />
      <CardMedia
        component="img"
        height="194"
        src={`/images/${img}`}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={addWishTrip}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={addToCart}>
          <ShoppingCartIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">Description:</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

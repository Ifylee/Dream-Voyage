import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar, Grid2 as Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGlobalState } from "../../utils/GlobalState";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_WISH_LIST } from "../../utils/mutation";
import { ADD_TRIP_TO_CART } from "../../utils/actions";
import Auth from "../../utils/auth";

// eslint-disable-next-line react/prop-types
export const TripCard = ({ id, title, description, img, price }) => {
  const [expanded] = React.useState(false);
  const [state, dispatch] = useGlobalState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  console.log(state);
  const [addList] = useMutation(ADD_WISH_LIST);

  const addToCart = async () => {
    dispatch({
      type: ADD_TRIP_TO_CART,
      payload: { title, img, price, id },
    });
    setIsSnackbarOpen(true);
    // Sets the message on the snackbar
    setSnackbarMessage("Trip added to cart!");
    console.log("test");
  };

  const addWishTrip = async () => {
    try {
      const { data } = await addList({ variables: { id } });
      if(Auth.loggedIn()){
        setIsSnackbarOpen(true);
        // Sets the message on the snackbar
        setSnackbarMessage("Added to wishlist!");
      }
      console.log("Success:", data);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/trip/${id}`);
  };
  return (
    <Grid>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Card key={id} sx={{ width: 345, height: 400 }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontSize: "1.3rem" }}>
              {title}
            </Typography>
          }
          // eslint-disable-next-line react/prop-types
          subheader={`Price: $${price.toFixed(2)}`}
        />
        <CardMedia
          component="img"
          height="194"
          src={`/images/${img}`}
          alt={title}
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />
        <CardContent></CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Grouping first two buttons */}
          <Box>
            <IconButton aria-label="add to favorites" onClick={addWishTrip}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={addToCart}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>

          {/* Spacer to push the button to the end */}
          <Box sx={{ flexGrow: 1 }} />

          {/* New button at the end */}
          <IconButton aria-label="settings" onClick={handleImageClick}>
            <InfoIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2">Description:</Typography>
            <Typography>{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

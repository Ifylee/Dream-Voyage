import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ONE_TRIP } from "../../utils/query";
import { Container, Grid2 as Grid, Typography, Box, IconButton } from "@mui/material";
import { useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useGlobalState } from "../../utils/GlobalState";
import { ADD_WISH_LIST } from "../../utils/mutation";
import { ADD_TRIP_TO_CART } from "../../utils/actions";


export const SingleTrip = () => {
  const [state, dispatch] = useGlobalState();
  console.log(state);
  const [addList] = useMutation(ADD_WISH_LIST);  
  const { id } = useParams();

  const { data, error, loading } = useQuery(ONE_TRIP, {
    variables: { id }, // Pass the variable here
  });

  if (loading) return <p>Loading...</p>;

  // Handle the error state
  if (error) return <p>Error: {error.message}</p>;

  // Check if `data` exists before trying to access `oneTrip`
  if (!data || !data.oneTrip) {
    return <p>No trip data found</p>;
  }

  const {title,img,price, additionalImages,groupSize,description} = data.oneTrip;

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
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
              <img src={`/images/${img}`} alt={title} style={{ height: '400px', objectFit: 'cover' }} />
            </div>
            {additionalImages && additionalImages.map((img, index) => (
              <div key={index}>
                <img src={`/images/${img}`} alt={`${title} ${index + 1}`} style={{ height: '400px', objectFit: 'cover' }} />
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', padding: 2 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Group Size: {groupSize}
            </Typography>
            <Typography variant="body1" paragraph>
              {description}
            </Typography>
            <Typography variant="h4" component="h3">
              Price: ${price ? price.toFixed(2) : 'N/A'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <IconButton aria-label="add to favorites" onClick={addWishTrip}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="add to cart" onClick={addToCart}>
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ONE_TRIP } from "../../utils/query";
import { Container, Grid, Typography, Box, IconButton } from "@mui/material";
import { useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const SingleTrip = () => {
  useEffect(() => {
    sessionStorage.removeItem("selectedTab");
  }, []);
  
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

  const trip = data.oneTrip;

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
              <img src={`/images/${trip.img}`} alt={trip.title} style={{ height: '400px', objectFit: 'cover' }} />
            </div>
            {trip.additionalImages && trip.additionalImages.map((img, index) => (
              <div key={index}>
                <img src={`/images/${img}`} alt={`${trip.title} ${index + 1}`} style={{ height: '400px', objectFit: 'cover' }} />
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', padding: 2 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              {trip.title}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Group Size: {trip.groupSize}
            </Typography>
            <Typography variant="body1" paragraph>
              {trip.description}
            </Typography>
            <Typography variant="h4" component="h3">
              Price: ${trip.price ? trip.price.toFixed(2) : 'N/A'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="add to cart">
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
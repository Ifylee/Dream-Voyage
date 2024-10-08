import React, { useState } from "react";
import { Tabs, Tab, Snackbar, Alert,Grid2 } from "@mui/material";
import { useGlobalState } from "../../utils/GlobalState"; // Import the useGlobalState hook
// import { TripCard } from '../../components/TripCard/TripCard'; // Import the TripCard component
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../utils/query";
import { MyTripsCard } from "../../components/MyTripsCard/myTripsCard";
// import TripList from '../../components/TripList/TripList'; // adjust the path as necessary
export const MyTrips = () => {
  const [dispatch] = useGlobalState(); // Use the useGlobalState hook to get the global state
//   const [commingUp, setCommingUp] = useState(true);
  const [value, setValue] = React.useState(0);
  const { data } = useQuery(CURRENT_USER);
  const [open, setOpen] = React.useState(false);
  
  console.log(data);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = (tripId) => {
      // Dispatch an action to remove the trip from the wishlist
      dispatch({ type: 'REMOVE_TRIP_FROM_WISHLIST', payload: tripId });
  }
  if (!data || data.oneTrip) {
    return <p>No trip data found</p>;
  }

  const {wishList, purchased} = data.currentUser;
  console.log(wishList, purchased)
  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        
        <Tab value ={1} label="Completed" />
        <Tab value={2} label="Wishlist" />
        <Tab value={3} label="Coming Up" />
      </Tabs>
      {value === 1 &&
        data &&
        data.currentUser &&
        data.currentUser.purchased && (
          // <TripList />
          <Grid2 container spacing={4} justifyContent="center" sx={{paddingTop:"40px"}}>
          {purchased.map((trip) => (
            <Grid2 xs={12} sm={6} md={4} key={trip._id}>
              <MyTripsCard
                id={trip.id}
                title={trip.title}
                img={trip.img}
              />
            </Grid2>
          ))}
        </Grid2>
          
        )}
      {value === 2 && data && data.currentUser && data.currentUser.wishList && (
        // <TripList
        //     trips={state.wishlist}
        // />
        <div>
          <p>Tesst</p>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          Trip added to wishlist!
        </Alert>
      </Snackbar>
    </div>
  );
};

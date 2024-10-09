import React, { useEffect } from "react";
import { Tabs, Tab, Snackbar, Alert, Grid2 } from "@mui/material";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../utils/query";
import { MyTripsCard } from "../../components/MyTripsCard/myTripsCard";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Auth from "../../utils/auth";

export const MyTrips = () => {
  const [value, setValue] = React.useState(1);
  const { data} = useQuery(CURRENT_USER);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!data || data.oneTrip) {
    return <p>No trip data found</p>;
  }

  const { wishList, purchased } = data.currentUser;
  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value={1} label="Wishlist" />
        <Tab value={2} label="Completed" />
        <Tab value={3} label="Coming Up" />
      </Tabs>
      {value === 1 && (
        // <TripList />
        <Grid2
          container
          spacing={4}
          justifyContent="center"
          sx={{ paddingTop: "40px" }}
        >
          {wishList.map((trip) => (
            <Grid2 xs={12} sm={6} md={4} key={trip._id}>
              <MyTripsCard id={trip.id} title={trip.title} img={trip.img} remove={true} />
            </Grid2>
          ))}
        </Grid2>
      )}
      {value === 2 && (
        <Grid2
          container
          spacing={4}
          justifyContent="center"
          sx={{ paddingTop: "40px" }}
        >
          {purchased.map((trip) => (
            <Grid2 xs={12} sm={6} md={4} key={trip._id}>
              <MyTripsCard id={trip.id} title={trip.title} img={trip.img} remove={false} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </div>
  );
};

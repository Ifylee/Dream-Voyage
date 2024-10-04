import React, { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';
import TripCard from './TripCard'; // Adjust the path as needed
import axios from 'axios'; // Make sure to install axios

export default function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('/api/trips'); // im not sure what the api endpoint is
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <Grid2 container spacing={2}>
      {trips.map((trip) => (
        <Grid2 item xs={12} sm={6} md={4} key={trip._id}>
          <TripCard
            title={trip.title}
            summary={trip.summary}
            description={trip.description}
            img={trip.img}
            price={trip.price}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}


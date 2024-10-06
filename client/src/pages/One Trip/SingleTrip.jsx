import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ONE_TRIP } from "../../utils/query";
import { Grid2 as Grid } from "@mui/material";
import { TripCard } from "../../components/TripCard/TripCard";

export const SingleTrip = () => {
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
  console.log(data.oneTrip);

  const trip = data.oneTrip;

  return (
    <div>
      <Grid container>
        <Grid xs={12} sm={6} md={4} key={trip.id}>
          <TripCard
            id={trip.id}
            title={trip.title}
            summary={trip.summary}
            description={trip.description}
            img={trip.img}
            price={trip.price}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} key={trip.id}>
          <TripCard
            id={trip.id}
            title={trip.title}
            summary={trip.summary}
            description={trip.description}
            img={trip.img}
            price={trip.price}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} key={trip.id}>
          <TripCard
            id={trip.id}
            title={trip.title}
            summary={trip.summary}
            description={trip.description}
            img={trip.img}
            price={trip.price}
          />
        </Grid>
      </Grid>
    </div>
  );
};

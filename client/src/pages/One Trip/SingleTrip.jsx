import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ONE_TRIP } from "../../utils/query";
import { Grid2 as Grid } from "@mui/material";
import { TripCard } from "../../components/TripCard/TripCard";

export const SingleTrip = () => {
  const { id } = useParams();

  const { data, error } = useQuery(ONE_TRIP, {
    variables: { id }, // Pass the variable here
  });
  const trip = data.oneTrip;
  console.log(data.oneTrip);

  return (
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
  );
};

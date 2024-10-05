import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Grid2";
import { TripCard } from "../TripCard/TripCard";
import { QUERY_ALL_TRIPS } from "../../utils/query";
import { useQuery } from "@apollo/client";
import { SET_TRIPS } from "../../utils/actions";
import { useGlobalState } from "../../utils/GlobalState";

export const TripList = () => {
  const [state, dispatch] = useGlobalState();

  const { trips, currentCategory } = state;

  const { data, loading, error } = useQuery(QUERY_ALL_TRIPS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: SET_TRIPS,
        payload: data.allTrips,
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return trips;
    }

    return trips.filter(
      (product) => product.category.id === currentCategory
    );
  }

  return (
    <Grid2 container spacing={2} key="40">
      {filterProducts().map((trip) => (
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
};

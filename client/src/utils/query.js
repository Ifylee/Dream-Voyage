import { gql } from "@apollo/client";

export const QUERY_ALL_TRIPS = gql`
  query AllTrips {
    allTrips {
      title
      summary
      price
      img
      id
      description
      category {
        id
        name
      }
    }
  }
`;

export const QUERY_CATEGORY = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      _id
      firstName
      purchased {
        category {
          name
        }
        description
        img
        price
        summary
        title
        id
      }
      wishList {
        category {
          name
        }
        description
        id
        img
        price
        summary
        title
      }
    }
  }
`;

export const ONE_TRIP = gql`
  query OneTrip($id: ID!) {
    oneTrip(_id: $id) {
      category {
        name
      }
      description
      id
      img
      additionalImages
      groupSize
      price
      summary
      title
    }
  }
`;

// client/src/utils/mutations.js
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        email
      }
    }
  }
`;

export const ADD_WISH_LIST = gql`
  mutation AddToList($id: ID!) {
    addToList(_id: $id) {
      _id
      wishList {
        title
        id
        category {
          name
        }
      }
    }
  }
`;

export const BOUGHT_TRIP = gql`
  mutation BoughtTrip($id: ID!) {
    boughtTrip(_id: $id) {
      _id
      email
      purchased {
        category {
          name
        }
        id
        title
      }
    }
  }
`;

export const DELETE_FROM_LIST = gql`
  mutation DeleteFromList($id: ID!) {
    deleteFromList(_id: $id) {
      _id
      wishList {
        category {
          name
        }
        title
        id
      }
    }
  }
`;

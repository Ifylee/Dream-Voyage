import {
  SET_TRIPS,
  ADD_TRIP_TO_CART,
  REMOVE_TRIP_FROM_CART,
  SET_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
} from "./actions";

export const initialState = {
  cart: [],
  isAuthenticated: false,
  trips: [],
  categories: [],
  currentCategory: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TRIPS:
      return {
        ...state,
        trips: action.payload, // Set the entire trips array
      };
    case ADD_TRIP_TO_CART:
      return {
        ...state,
        cart: state.cart.some((item) => item.id === action.payload.id)
          ? state.cart // If the item already exists, return the current cart unchanged
          : [...state.cart, action.payload], // Otherwise, add the new item
      };
    case REMOVE_TRIP_FROM_CART:
      let updatedCart = state.cart.filter((trip) => trip.id !== action.payload); // Remove a trip by id
      return {
        ...state,
        cart: updatedCart,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload], // Set the entire categories array
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload, //updates the category selected
      };

    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
};


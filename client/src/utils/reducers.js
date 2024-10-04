

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TRIPS":
      return action.payload; // Set the entire trips array
    case "ADD_TRIP_TO_CART":
      return [...state, action.payload]; // Add a new trip
    case "REMOVE_TRIP_FROM_CART":
      return state.filter((trip) => trip._id !== action.payload); // Remove a trip by id
      case "CLEAR_CART":
        return {
          ...state,
          cart: [],
        };
    case "SET_CATEGORIES":
      return action.payload; // Set the entire categories array
    case "UPDATE_CURRENT_CATEGORY":
      return [...state, action.payload]; // Add a new category

    default:
      return state;
  }
};

// User reducer
const globalUserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Trips reducer
const globalTripsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRIPS":
      return action.payload; // Set the entire trips array
    case "ADD_TRIP":
      return [...state, action.payload]; // Add a new trip
    case "REMOVE_TRIP":
      return state.filter((trip) => trip._id !== action.payload); // Remove a trip by id
    default:
      return state;
  }
};

// Categories reducer
const globalCategoriesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return action.payload; // Set the entire categories array
    case "ADD_CATEGORY":
      return [...state, action.payload]; // Add a new category
    case "REMOVE_CATEGORY":
      return state.filter((category) => category._id !== action.payload); // Remove a category by id
    default:
      return state;
  }
};

// Combine reducers
export const globalStateReducer = (state, action) => {
  return {
    user: globalUserReducer(state.user, action),
    isAuthenticated: state.isAuthenticated, // Kept unchanged, managed by globalUserReducer
    trips: globalTripsReducer(state.trips, action),
    categories: globalCategoriesReducer(state.categories, action),
  };
};

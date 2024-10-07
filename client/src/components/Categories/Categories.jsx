import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useGlobalState } from "../../utils/GlobalState";
import { SET_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../../utils/actions";
import { QUERY_CATEGORY } from "../../utils/query";
import Container from "@mui/material/Container"; // Import Container
import Button from "@mui/material/Button"; // Import Button for consistent styling
export const Categories = () => {
  const [state, dispatch] = useGlobalState();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORY);
  console.log(state);
  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: SET_CATEGORIES,
        payload: categoryData.categories,
      });
    }
  }, [categoryData, loading, dispatch]);
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      payload: id,
    });
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", marginBottom: 2, marginTop: 2 }}
    >
      <div>
        <Button
          variant="contained"
          onClick={() => {
            handleClick("");
          }}
          sx={{
            margin: 1,
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            '&:hover': { backgroundColor: '#0056B3' }
          }}
        >
          All Trips
        </Button>
        {categories.map((item) => (
          <Button
            key={item._id}
            variant="contained"
            onClick={() => {
              handleClick(item.id);
            }}
            sx={{
              margin: 1,
              backgroundColor: "#28A745",
              color: "#FFFFFF",
              '&:hover': { backgroundColor: '#218838' }
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </Container>
  );
};
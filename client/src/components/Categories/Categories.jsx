import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useGlobalState } from "../../utils/GlobalState";
import { SET_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../../utils/actions";
import { QUERY_CATEGORY } from "../../utils/query";
import { Container } from "@mui/material";

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
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, marginTop: 2 }}>
      <div key="30">
        
        <button
          variant="contained"
          onClick={() => {
            handleClick("");
          }}
          sx={{ margin: 1 }}
        >
          All Trips
        </button>
        {categories.map((item) => (
          <button
            key={item._id}
            variant="contained"
            onClick={() => {
              handleClick(item.id);
            }}
            sx={{ margin: 1 }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </Container>
  );
};

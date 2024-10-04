import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useGlobalState } from "../../utils/GlobalState";
import { SET_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";

function Categories() {
  const [state, dispatch] = useGlobalState();
  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

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
    <div>
      <h2>Choose a Region:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;

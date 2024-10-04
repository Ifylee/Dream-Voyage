import TripList from "../components/TripList";
import Categories from "../components/Categories";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <Categories />
      <TripList />
      <Cart />
    </div>
  );
};

export default Home;

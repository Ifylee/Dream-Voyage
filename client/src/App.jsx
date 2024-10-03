
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GlobalStateProvider } from "./context/GlobalState"; // Import the GlobalStateProvider

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStateProvider> {/* Wraps the Outlet component in the GlobalStateProvider */}
        <Nav />
        <Outlet />
      </GlobalStateProvider>
    </ApolloProvider>
  );
}

export default App;
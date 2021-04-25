import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/connection";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Auth from "./components/Auth";

function App() {
  return (
    <ApolloProvider client={client}>
      <Auth />
    </ApolloProvider>
  );
}

export default App;

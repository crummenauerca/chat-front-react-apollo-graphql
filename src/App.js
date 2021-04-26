import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/connection";

import Auth from "./components/Auth";

function App() {
  return (
    <ApolloProvider client={client}>
      <Auth />
    </ApolloProvider>
  );
}

export default App;

import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/connection";

import Auth from "./pages/Auth";

function App() {
  return (
    <ApolloProvider client={client}>
      <Auth />
    </ApolloProvider>
  );
}

export default App;

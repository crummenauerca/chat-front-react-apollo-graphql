import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/connection";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import Chat from "./components/Chat";

function App() {
  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}

export default App;

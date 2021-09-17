import React from "react"; 
import Screen from "./Screen";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://api.graphql.guide/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const App = () => (
    <ApolloProvider client={client}>
        <Screen/>
    </ApolloProvider>
)

export default App
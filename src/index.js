import React from "react"; 
import Screen from "./Screen";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenRealm from "./ScreenRealm";

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://api.graphql.guide/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const Stack = createNativeStackNavigator();

const App = () => (
    <ApolloProvider client={client}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Screen} />
                <Stack.Screen name="Realm" component={ScreenRealm} />
            </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
)

export default App

/*
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
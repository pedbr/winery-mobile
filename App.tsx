import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './src/screens/HomeScreen'
import WineryScreen from './src/screens/WineryScreen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Wineries" component={WineryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App

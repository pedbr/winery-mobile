import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import HomeScreen from './src/screens/HomeScreen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  )
}

export default App

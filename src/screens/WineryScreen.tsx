import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useQuery } from 'react-query'
import { get } from '../api'
import endpoints from '../api/endpoints'

const WineryScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const fetchWineries = async () => {
    try {
      const res = await get(endpoints.getWineries)
      if (res?.data) {
        return res.data
      }
    } catch (error) {
      console.log('fetchWineries Error -', error)
    }
  }

  const { data: wineries, isLoading: wineriesLoading } = useQuery(
    'wineries',
    fetchWineries,
  )

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Wineries:</Text>
          {wineriesLoading ? (
            <Text>Loading...</Text>
          ) : (
            wineries?.map((winery: any) => (
              <Text key={winery.location}>{winery.location}</Text>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default WineryScreen

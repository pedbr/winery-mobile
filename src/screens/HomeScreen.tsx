import React, {useState, useEffect, useCallback} from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useQuery} from 'react-query'
import {get} from '../api'
import endpoints from '../api/endpoints'
import Login from './Login'

interface User {
  email: string
  getIdToken: () => string
}

const HomeScreen = () => {
  const [initializing, setInitializing] = useState(true)
  const [signedUser, setUser] = useState<User | null>()
  const isDarkMode = useColorScheme() === 'dark'

  const onAuthStateChanged = useCallback(
    async user => {
      setUser(user)
      try {
        const token = await user?.getIdToken()
        await AsyncStorage.setItem('FBIdToken', `Bearer ${token}`)
      } catch (e) {
        console.error(e)
      }

      if (initializing) {
        setInitializing(false)
      }
    },
    [initializing],
  )

  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [onAuthStateChanged])

  const fetchWineries = async () => {
    const res = await get(endpoints.getWineries)
    console.log('here')
    return res
  }

  const {data: wineries, isLoading: wineriesLoading} = useQuery(
    `wineries-${signedUser?.email}`,
    fetchWineries,
  )

  console.log('wineriesLoading', wineriesLoading)
  console.log('wineries', wineries?.data)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  if (initializing) {
    return null
  }

  if (!signedUser) {
    return <Login />
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
          <Text>Grapely {signedUser?.email}</Text>
          <Text>Wineries:</Text>
          {wineries?.data?.map((winery: any) => (
            <Text key={winery.location}>{winery.location}</Text>
          ))}
          <Button onPress={signOutUser} title={'Sign Out'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

import React, { useState, useEffect, useCallback } from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import Login from './Login'
import useNavigation from '../hooks/navigation'

interface User {
  email: string
  getIdToken: () => string
}

const HomeScreen = () => {
  const [initializing, setInitializing] = useState(true)
  const [signedUser, setUser] = useState<User | null>()
  const isDarkMode = useColorScheme() === 'dark'
  const navigation = useNavigation()

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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Grapely {signedUser?.email}</Text>
          <Button
            title="Go to Wineries"
            onPress={() => navigation.navigate('Wineries')}
          />
          <Button onPress={signOutUser} title={'Sign Out'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

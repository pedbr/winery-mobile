import { useNavigation as useDefaultNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'

type StackParamList = {
  Home: undefined
  Wineries: undefined
}

type NavigationProps = StackNavigationProp<StackParamList>

const useNavigation = () => {
  const navigation = useDefaultNavigation<NavigationProps>()
  return navigation
}

export default useNavigation

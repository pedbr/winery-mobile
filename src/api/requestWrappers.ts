import axios from 'axios'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'

// export const BASE_URL =
//   'https://europe-west1-winery-app-b819d.cloudfunctions.net/api'

export const BASE_URL =
  'http://localhost:5001/winery-app-b819d/europe-west1/api'

type MethodType =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'
  | undefined

const request = async (method: MethodType, url: string, payload?: any) => {
  const token = await AsyncStorage.getItem('FBIdToken')
  if (token && token !== 'Bearer undefined') {
    const decodedToken: any = jwtDecode(token)
    if (decodedToken.exp * 1000 > Date.now()) {
      try {
        return axios({
          method,
          url: `${BASE_URL}${url}`,
          data: payload,
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json;  charset=UTF-8',
            'Cache-Control': 'no-cache',
          },
        }).catch(err => {
          if (axios.isCancel(err)) {
            err.cancelled = true
          }
          throw err
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      return console.log('Token invalid, user should be redirected to login')
    }
  }
}
export const _request = request
export const _get = (url: string) => request('GET', url)
export const _delete = (url: string) => request('DELETE', url)
export const _post = (url: string, payload: any) =>
  request('POST', url, payload)
export const _patch = (url: string, payload: any) =>
  request('PATCH', url, payload)

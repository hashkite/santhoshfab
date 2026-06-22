import axios from 'axios'
import { useLocation } from 'react-router'
import { API_URL } from '../config'

export const apiInstance = axios.create({
  baseURL: API_URL,
})

export const apiPostInstance = apiInstance

export const usedTransformedLocation = () => {
  const { pathname } = useLocation()

  if (pathname === '/') return '/homepage'
  return pathname
}

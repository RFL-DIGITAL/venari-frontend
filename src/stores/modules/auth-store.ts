import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { baseURL, devApiUrl } from 'src/utils/services/config.js'
import { useRoute } from 'vue-router'
import {
  AuthRequest,
  authRequest,
  registerRequest,
  RegisterUserRequest,
  User,
  userRequest,
} from '../types/schema'

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'

export interface LoginRequest
  extends Pick<AuthRequest, 'username' | 'password'> {}

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<Partial<User> | null>(null)
  const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_KEY) ?? '')
  const isAuthenticated = ref(false)

  /* TODO: заменить на user */
  const login = async (_data: LoginRequest) => {
    const request: AuthRequest = {
      ..._data,
      scope: '*',
      grantType: 'password',
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    }

    const {
      data: { accessToken, refreshToken },
    } = await authRequest(request)

    setToken(accessToken, refreshToken)
    /* setAuthUser(user, token) */
  }

  const register = async (_data: RegisterUserRequest) => {
    const {
      response: { user, accessToken },
    } = await registerRequest(_data)
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

    setAuthUser(user)
  }

  const auth = async () => {
    const request: AuthRequest = {
      scope: '*',
      grantType: 'refresh_token',
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      refreshToken: getTokens().refreshToken,
    }

    const { data: { accessToken, refreshToken } } = await authRequest(request)

    setToken(accessToken, refreshToken)
    return getTokens()
  }

  const getCurrentUser = async () => {
    const { data: user } = await userRequest()

    setAuthUser(user)
  }

  function setAuthUser(_user: Partial<User>) {
    user.value = _user
    isAuthenticated.value = true
  }

  function setToken(_accessToken: string, _refreshToken: string) {
    accessToken.value = _accessToken
    localStorage.setItem(ACCESS_TOKEN_KEY, _accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, _refreshToken)
  }

  function getTokens() {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    }
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    getCurrentUser,
    login,
    register,
    auth,
  }
})

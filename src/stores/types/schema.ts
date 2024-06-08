import { request } from '@/utils/services/client'

export interface BaseResponse<T> {
  success: boolean
  response: T
}

export interface RegisterUserRequest {
  email: string
  password: string
  login: string
}

export interface LoginUserRequest {
  email: string
  password: string
}

export interface AuthRequest {
  scope: string
  grantType: 'password' | 'refresh_token'
  username?: string
  password?: string
  clientId: string
  clientSecret: string
  refreshToken?: string
}

export interface AuthResponse {
  tokenType: string
  expiresIn: number
  accessToken: string
  refreshToken: string
}

export interface User {
  name: string
  email: string
  updateAt: string
  createdAt: string
  id: number
}

export interface RegisterUser {
  user: User
  accessToken: string
}

export interface LoginUser {
  user: User
  token: string
}


/* TODO: В других запросах писать /api */
/* Получить юзера */
export const userRequest = (options?: any) => request<User>('/api/user', { method: 'GET', ...options })

/* Регистрация */
export const registerRequest = (body: RegisterUserRequest, options?: any) => request<BaseResponse<RegisterUser>>('/register', { body, method: 'POST', ...options })

/* Аутентификая / авторизация */
export const authRequest = (body: AuthRequest, options?: any) => request<AuthResponse>('/oauth/token', { body, method: 'POST', ...options })

/* Выйти */
/* export const logoutRequest = (options?: any) => request<void>('/auth/logout', { method: 'GET', ...options }) */

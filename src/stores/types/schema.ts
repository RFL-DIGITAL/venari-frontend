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



export interface ChatsResponse {
    name: string;
    avatar: string|null;
    body: string;
    updated_at: string|Date;
    type: "message" | "chatMessage";
    id: number;
}


export interface ChatMessage {
  id: number;
  ownerId: number;
  toId: number|string;
  owner?: User | null;
  attachments: {
    text: string;
    file: string|null;
    image: string|null;
    link: string|null;
  }
  createdAt: string;
}

export interface ISendMessage {
  toID: number;
  body: string;
  type: string;
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


/** получение списка чатов */
export const getChatsRequest = (options?: any) => request<BaseResponse<ChatsResponse[]>>('/api/chats', {method: "GET", ...options});

/** получить сообщения чата 1 на 1 */
export const getPersonalChatMessagesRequest = (userId: number, options?: any) => request<BaseResponse<ChatMessage[]>>(`/api/chats/personal/${userId}`, {method: "GET", ...options });


export const sendMessageRequest = (data: ISendMessage, options?: any) => 
  request<BaseResponse<ChatMessage>>('/api/messages/send-message', {method: "POST", ...options, body: data})
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

/* TODO: */
export interface Hrable {
  id: 6
  created_at: string
  updated_at: string
  companyId: 8
  company: Company
}

export interface User {
  id: number
  name: string
  email: string
  workingStatusId?: number
  positionId?: number
  sex: boolean
  dateOfBirth: string
  hrableId: number
  nullable: true
  hrableType: string
  createdAt: string
  updatedAt: string
  imageId: 24
  hrable?: Hrable
}

/* TODO: Фикс */
export interface Company {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description: string
  establishedAt: string
  nickName: string
  buildingId?: number
  previewId?: number
  imageId?: number
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
  name: string
  avatar: string | null
  body: string
  updated_at: string | Date
  type: 'message' | 'chatMessage'
  id: number
}

export interface ChatMessage {
  id: number
  ownerId: number
  toId: number | string
  owner: User
  attachments: {
    text: string
    file: string | null
    image: string | null
    link: string | null
  }
}

export interface ISendMessage {
  toID: number
  body: string
  type: string
}

export interface Post {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  text: string
  userId: number
  attributes: null
  likes: number
  description: string | null
  source: string
  userName: string
  sourceUrl: string | null
  commentCount: 0
  user: User
  comments: Comment[]
  images: any[]
}

export interface PostPaginatedList extends Paginator {
  data: Post[]
}

export interface Paginator {
  nextPageUrl: string
  path: string
  perPage: number
  prevPageUrl: string
  to: number
  total: number
  from: number
  lastPage: number
  currentPage: number
}

export interface PaginatorFilter {
  perPage: number
  page: number
}

export interface PostsGetRequestParams extends PaginatorFilter {}

export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  text: string
  userId: number
  postId: number
  parentId?: number
}

export interface CommentPaginatedList extends Paginator {
  data: Comment[]
}

export interface CommentsGetRequestParams extends PaginatorFilter {}

export interface CommemtPostRequest {
  text: string
  postId: number
  parentId: number
}

/* TODO: В других запросах писать /api */
/* Получить юзера */
export const userRequest = (options?: any) =>
  request<User>('/api/user', { method: 'GET', ...options })

/* Регистрация */
export const registerRequest = (body: RegisterUserRequest, options?: any) =>
  request<BaseResponse<RegisterUser>>('/register', {
    body,
    method: 'POST',
    ...options,
  })

/* Аутентификая / авторизация */
export const authRequest = (body: AuthRequest, options?: any) =>
  request<AuthResponse>('/oauth/token', { body, method: 'POST', ...options })

/** получение списка чатов */
export const getChatsRequest = (options?: any) =>
  request<BaseResponse<ChatsResponse[]>>('/api/chats', {
    method: 'GET',
    ...options,
  })

/** получить сообщения чата 1 на 1 */
export const getPersonalChatMessagesRequest = (userId: number, options?: any) =>
  request<BaseResponse<ChatMessage[]>>(`/api/chats/personal/${userId}`, {
    method: 'GET',
    ...options,
  })

export const sendMessageRequest = (data: ISendMessage, options?: any) =>
  request<BaseResponse<ChatMessage>>('/api/messages/send-message', {
    method: 'POST',
    ...options,
    body: data,
  })

/* Получить список постов */
export const getPostsRequest = (params: PostsGetRequestParams, options?: any) =>
  request<BaseResponse<PostPaginatedList>>('/api/posts', {
    params,
    method: 'GET',
    ...options,
  })

/* Получить пост */
export const getPostRequest = (id: number, options?: any) =>
  request<BaseResponse<Post>>(`/api/posts/${id}`, {
    method: 'GET',
    ...options,
  })

/* Получить комментарии к посту */
export const getCommentsRequest = (
  id: number,
  params: CommentsGetRequestParams,
  options?: any,
) =>
  request<BaseResponse<CommentPaginatedList>>(`/api/posts/${id}/comments`, {
    params,
    method: 'GET',
    ...options,
  })

/* Метод добавления комментария к посту */
export const postCommentRequest = (body: CommemtPostRequest, options?: any) =>
  request<BaseResponse<Comment>>('/api/comments/send-comment', {
    method: 'POST',
    ...options,
    body,
  })

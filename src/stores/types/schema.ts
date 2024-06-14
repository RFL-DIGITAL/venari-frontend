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
  image: Image
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
  updated_at: string | Date | ""
  type: 'message' | 'chatMessage'
  id: number
}

export interface ChatMessage {
  id: number
  ownerId: number
  toId: number | string
  owner?: User | null
  attachments: {
    text: string
    file: string | null
    image: string | null
    link: string | null
  }
  createdAt: string;
}

export interface ISendMessage {
  toID: number
  body: string
  type: string
  image?: string | null;
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

export interface PaginatedList<T> extends Paginator {
  data: T[]
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

export interface Image {
  id: number
  createdAt: string
  updatedAt: string
  image: string
  description: string
}

export interface BaseResource {
  id: number
  createdAt: string
  updatedAt: string
  name: string
}

export interface Department extends BaseResource {
  companyId: number
  company: Company
}

export interface City extends BaseResource {
  countryId?: number
}

export interface Skill extends BaseResource {
  pivot: {
    skillId: number
    vacancyId: number
  }
}

export interface Vacancy {
  id: number
  createdAt: string
  updatedAt: string
  positionId: number
  description: string
  isOnline: number
  departmentId: number
  hasSocialSupport: number
  schedule: string
  isFlexible: number
  linkToTestDocument?: string
  cityId?: number
  isClosed: number
  isOuter: number
  responsibilities: string
  requirements: string
  conditions: string
  additional: null
  experienceId?: number
  employmentId?: number
  lowerSalary?: number
  higherSalary?: number
  imageId?: number
  image?: Image
  employment: BaseResource
  department: Department
  experience?: BaseResource
  city?: City
  position: BaseResource
  skills: Skill[]
}

export interface VacanciesGetRequestParams extends PaginatorFilter {}

export interface NetworkingsGetRequestParams extends PaginatorFilter {}

export interface Tag extends BaseResource {
  memberCount: number
}

export interface Networking {
  id: number
  name: string
  description: string
  memberCount: number
  createdAt: string
  updatedAt: string
  image?: Image
  tags: Tag[]
  isJoined: boolean
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
export const getChatsRequest = (options?: any) => request<BaseResponse<ChatsResponse[]>>('/api/messages', {method: "GET", ...options});

/** получить сообщения чата 1 на 1 */
export const getPersonalChatMessagesRequest = (userId: number, options?: any) =>
  request<BaseResponse<ChatMessage[]>>(`/api/messages/${userId}`, {
    method: 'GET',
    ...options,
  })
/** отправка сообщения */
export const sendMessageRequest = (data: ISendMessage, options?: any) =>
  request<BaseResponse<ChatMessage>>('/api/messages/send-message', {
    method: 'POST',
    ...options,
    body: data,
  })

/* Получить список постов */
export const getPostsRequest = (params: PostsGetRequestParams, options?: any) =>
  request<BaseResponse<PaginatedList<Post>>>('/api/posts', {
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

/* Получить список вакансий */
export const getVacanciesRequest = (
  params: VacanciesGetRequestParams,
  options?: any,
) =>
  request<BaseResponse<PaginatedList<Vacancy>>>('/api/vacancies', {
    params,
    method: 'GET',
    ...options,
  })

/* Получить вакансию */
export const getVacancyRequest = (id: number, options?: any) =>
  request<BaseResponse<Vacancy>>(`/api/vacancies/${id}`, {
    method: 'GET',
    ...options,
  })

/* Получить список нетворкингов */
export const getNetworkingsRequest = (
  params: NetworkingsGetRequestParams,
  options?: any,
) =>
  request<BaseResponse<PaginatedList<Networking>>>('/api/networking', {
    params,
    method: 'GET',
    ...options,
  })

/* Получить нетворкинг */
export const getNetworkingRequest = (id: number, options?: any) =>
  request<BaseResponse<Networking>>(`/api/networking/${id}`, {
    method: 'GET',
    ...options,
  })


export const getChatsMessagesRequest = (chatId: number, options?: any) => 
  request<BaseResponse<ChatMessage[]>>(`/api/networking/${chatId}/messages`, {method: "GET", ...options})

export const joinChatRequest = (chatId: number, options?: any) => request<BaseResponse<Networking>>('/api/messages/join-chat', {method: "POST", ...options, body: {
  chat_id: chatId
}})
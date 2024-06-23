import { request } from '@/utils/services/client'

export interface BaseResponse<T> {
  success: boolean
  response: T
}

export interface RegisterUserRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  middleName?: string
  birthDate: string
  userName: string
  phone?: string
  image?: string
  sex: false
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

export interface ResumeProgramSchools extends BaseResource {
  programSchool: ProgramSchool
  startDate: string
  endDate: string
}

export interface ProgramSchool extends BaseResource {
  program: Program
  school: BaseResource
}

export interface Program extends BaseResource {
  programType: BaseResource
}

export interface UserPositions extends BaseResource {
  company: Company
  position: BaseResource
  startDate: string
  endDate: string
  description: string
}

export interface LanguageLevel extends BaseResource {
  language: BaseResource
  level: BaseResource
}

export interface Resume {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  description: string
  userId: number
  contactPhone: string
  contactMail: string
  salary: string
  resumeProgramSchools: ResumeProgramSchools[]
  userPositions: UserPositions[]
  employment: BaseResource
  specialization: BaseResource
  position: BaseResource
  languageLevels: LanguageLevel[]
  skills: BaseResource[]
  format: BaseResource
  user: User
  experience: string
  city: City
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
  hrableType: string
  createdAt: string
  updatedAt: string
  imageId: 24
  hrable?: Hrable
  firstName: string
  lastName: string
  image: Image
  preview: Image
  company: Company
  city: City
  tags: Tag[]
  resumes: Resume[]
  position: BaseResource
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
  updated_at: string | Date | ''
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
  createdAt: string
}

export interface ISendMessage {
  toID: number
  body: string
  type: string
  image?: string | null
}

export interface Part {
  contentId: number
  contentType: string
  id: number
  createdAt: string
  order: number
  postId: number
  updateAt: number
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
  commentCount: number
  user: User
  comments: Comment[]
  images: any[]
  parts: Part[]
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

export interface PostsGetRequestParams extends PaginatorFilter {
  forceOuter: any
}

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

export interface VacanciesGetRequestParams extends PaginatorFilter {}

export interface NetworkingsGetRequestParams extends PaginatorFilter {}

export interface Tag extends BaseResource {
  memberCount: number
}

export interface Accountable {
  id: number
  createdAt: string
  updatedAt: string
  company_d: 3
  user: User
}

export interface HrVacancy extends Vacancy {
  accountable: Accountable
  city: City
  applicationCount: number
  candidateCount: number
  day: number
  additionalTitle: string
  test: string
  specializationId?: number
}

export interface HrVacancyGetRequestParams extends PaginatorFilter {
  status?: number
  specializationId?: number
  name?: string
  accountableId?: number
  city?: string
}

export interface CreateVacancyRequest {
  positionName: string
  departmentId: number
  specializationId: number
  cityId: number
  lowerSalary: number
  upperSalary: number
  responsibilities: string
  requirements: string
  conditions: string
  additional: string
  additionalTitle: string
  skills: string[]
  experienceId: number
  employmentId: number
  formatId: number
  test: string
  statusId: number
  image: string
}

export interface HrFilters {
  statuses: BaseResource[]
  employments: BaseResource[]
  experiences: BaseResource[]
  formats: BaseResource[]
  specializations: BaseResource[]
  departments: BaseResource[]
  accountables: BaseResource[]
  programTypes: BaseResource[]
  stages: BaseResource[]
  rejectReasons: BaseResource[]
  templates: BaseResource[]
}

export interface ArchiveVacancyBodyRequest {
  vacancyIds: number[]
}

export interface HrCandidatesGetRequestParams extends PaginatorFilter {
  experinceId?: number
  city?: string
  specializationId?: number
  employmentId?: number
  programTypeId?: number
  higherSalary?: number
  lowerSalary?: number
}

export interface HrPublicationsGetRequestParams extends PaginatorFilter {
  date?: string[]
}

export interface ICreateSlotsRequestParams {
  start_time: string
  end_time: string
  slot_duration: number | string
  break_duration: number | string
  days: string[]
  is_create_meet: boolean
}

export interface ResumeCreateRequestBody {
  contactPhone: string
  contactMail: string
  salary: string
  description: string
  programSchools: ResumeCreateProgramSchollBody[]
  userPositions: ResumeCreateUserPositionBody[]
  employmentId: number
  specializationId: number
  formatId: number
  position: string
  languageLevels: ResumeCreateLanguageLevelBody[]
  skills: string[]
  city: string
}

export interface ResumeEditRequestBody extends ResumeCreateRequestBody {
  id: number
}

export interface ResumeCreateProgramSchollBody {
  programId: number
  schoolId: number
  startDate: string
  endDate: string
  programType: string
}

export interface ResumeCreateUserPositionBody {
  companyId: number
  positionId: number
  startDate: string
  endDate: string
  description: string
}

export interface ResumeCreateLanguageLevelBody {
  levelId: number
  languageId: number
}

export interface ResumeFilters {
  employments: BaseResource[]
  formats: BaseResource[]
  specializations: BaseResource[]
  city: BaseResource[]
  languages: BaseResource[]
  level: BaseResource[]
  universities: BaseResource[]
  programs: BaseResource[]
  programTypes: BaseResource[]
  companies: BaseResource[]
  positions: BaseResource[]
}

export interface PostChangeApplicationsStageRequest {
  applicationIds: number[]
  rejectReasonId?: number
  isSendRejectMessage?: boolean
  rejectMessage?: string
  interviewMessage?: string
  offerMessage?: string
}

export interface PostShareApplicationsBodyRequest {
  applicationIds: number[]
}

export interface ApplicationShort {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  resume: Resume
}

export interface ApplicationComment extends BaseResource {
  text: string
  user: User
  applicationId: number
}

export interface ApplicationApprove extends BaseResource {
  surname: string
  applicationId: number
  statusId: boolean
}
export interface Application {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  resume: Resume
  comments: ApplicationComment[]
  approves: ApplicationApprove[]
}

export interface HrApplicationGetRequestParams extends PaginatorFilter {
  stageId?: number
  vacancyId?: number
}

export interface PostApproveApplicationRequestBody {
  applicationId: number
  name: string
  surname: string
  isApproved: boolean
  comment: string
}


export interface IGetAvailableSlots {
  accountableId: number,
  month: string,
}


/* TODO: В других запросах писать /api */
/* Получить юзера */
export const userRequest = (options?: any) =>
  request<User>('/api/user', { method: 'GET', ...options })

/* Регистрация */
export const registerRequest = (body: RegisterUserRequest, options?: any) =>
  request<BaseResponse<RegisterUser>>('api/register', {
    body,
    method: 'POST',
    ...options,
  })

/* Аутентификая / авторизация */
export const authRequest = (body: AuthRequest, options?: any) =>
  request<AuthResponse>('/oauth/token', { body, method: 'POST', ...options })

/** получение списка чатов */
export const getChatsRequest = (options?: any) =>
  request<BaseResponse<ChatsResponse[]>>('/api/messages', {
    method: 'GET',
    ...options,
  })

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

/* Получить сообщения чата */
export const getChatsMessagesRequest = (chatId: number, options?: any) =>
  request<BaseResponse<ChatMessage[]>>(`/api/networking/${chatId}/messages`, {
    method: 'GET',
    ...options,
  })

/* Присоедениться к чату */
export const joinChatRequest = (chatId: number, options?: any) =>
  request<BaseResponse<Networking>>('/api/messages/join-chat', {
    method: 'POST',
    ...options,
    body: {
      chat_id: chatId,
    },
  })

/* Получить юзера по id */
export const getUserById = (userId: number, options?: any) =>
  request<BaseResponse<User>>(`/api/users/${userId}`, {
    method: 'GET',
    ...options,
  })

/* Получить посты */
export const getPostsByIdRequest = (userId: number, options?: any) =>
  request<BaseResponse<PaginatedList<Post>>>(`/api/users/${userId}/posts`, {
    method: 'GET',
    ...options,
  })

/* Получить резюме */
export const getResumeByIdRequest = (resumeId: number, options?: any) =>
  request<BaseResponse<Resume>>(`/api/resumes/${resumeId}`, {
    method: 'GET',
    ...options,
  })

/* Получить ресурсы для резюме */
export const getResumeFiltersRequest = (options?: any) =>
  request<BaseResponse<ResumeFilters>>('/api/resume-filters', {
    method: 'GET',
    ...options,
  })

/* Создать резюме */
export const postResumeCreateRequest = (
  body: ResumeCreateRequestBody,
  options?: any,
) =>
  request<BaseResponse<Resume>>('/api/resumes/create-resume', {
    method: 'POST',
    ...options,
    body,
  })

/* Редактировать резюме */
export const putResumeCreateRequest = (
  body: ResumeCreateRequestBody,
  options?: any,
) =>
  request<BaseResponse<Resume>>('/api/resumes/edit-resume', {
    method: 'POST',
    ...options,
    body,
  })

export const getApplicationsRequest = (code: string, options?: any) =>
  request<BaseResponse<ApplicationShort[]>>(
    `/api/variants/see-variants/${code}`,
    {
      method: 'GET',
      ...options,
    },
  )

/* HR */
/* Получить список нетворкингов */
export const getHrVacanciesRequest = (
  params: HrVacancyGetRequestParams,
  options?: any,
) =>
  request<BaseResponse<PaginatedList<HrVacancy>>>('/api/hr-panel/vacancies', {
    params,
    method: 'GET',
    ...options,
  })

export const getHrFilterRequest = (options?: any) =>
  request<BaseResponse<HrFilters>>('/api/hr-panel/filters', {
    method: 'GET',
    ...options,
  })

export const postHrVacancyRequest = (
  body: CreateVacancyRequest,
  options?: any,
) =>
  request<BaseResponse<HrVacancy>>('/api/hr-panel/vacancies/create-vacancy', {
    method: 'POST',
    ...options,
    body,
  })

export const putHrVacancyRequest = (
  body: CreateVacancyRequest,
  options?: any,
) =>
  request<BaseResponse<HrVacancy>>('/api/hr-panel/vacancies/edit-vacancy', {
    method: 'PUT',
    ...options,
    body,
  })

export const postArchiveVacancyRequest = (
  body: ArchiveVacancyBodyRequest,
  options?: any,
) =>
  request<BaseResponse<HrVacancy>>(
    '/api/hr-panel/vacancies/archive-vacancies',
    {
      method: 'POST',
      ...options,
      body,
    },
  )

export const postUnarchiveVacancyRequest = (
  body: ArchiveVacancyBodyRequest,
  options?: any,
) =>
  request<BaseResponse<HrVacancy>>(
    '/api/hr-panel/vacancies/un-archive-vacancies',
    {
      method: 'POST',
      ...options,
      body,
    },
  )

export const getCandidatesRequest = (
  params: HrCandidatesGetRequestParams,
  options?: any,
) =>
  request<BaseResponse<PaginatedList<User>>>('/api/hr-panel/candidates', {
    params,
    method: 'GET',
    ...options,
  })

export const calendarLoginRequest = (code?: string | null, options?: any) => {
  if (code) {
    return request<BaseResponse<any>>(
      `api/hr-panel/calendar/login-with-google?code=${code}`,
      {
        method: 'POST',
        ...options,
      },
    )
  } else {
    return request<BaseResponse<any>>(
      `api/hr-panel/calendar/login-with-google`,
      {
        method: 'POST',
        ...options,
      },
    )
  }
}

export const getCalendarIdRequest = (options?: any) =>
  request<BaseResponse<{ calendarId: string }>>(
    '/api/hr-panel/calendar/get-calendar-id',
    {
      method: 'GET',
      ...options,
    },
  )

export const createSlotsRequest = (
  body: ICreateSlotsRequestParams,
  options?: any,
) =>
  request<BaseResponse<{ message: string }>>(
    '/api/hr-panel/calendar/create-slots',
    {
      method: 'POST',
      body: body,
      ...options,
    },
  )

export const exportCalendarRequest = (options?: any) =>
  request<any>('/api/hr-panel/calendar/download-ics', {
    method: 'GET',
    ...options,
  })

export const postChangeApplicationsStage = (
  body: PostChangeApplicationsStageRequest,
  options?: any,
) =>
  request<BaseResponse<{ message: string }>>(
    '/api/hr-panel/candidates/change-stages',
    {
      method: 'POST',
      body: body,
      ...options,
    },
  )

export const postShareApplications = (
  body: PostShareApplicationsBodyRequest,
  options?: any,
) =>
  request<BaseResponse<string>>('/api/hr-panel/candidates/share-applications', {
    method: 'POST',
    body: body,
    ...options,
  })

export const getHrApplicationListRequest = (
  params: HrApplicationGetRequestParams,
  options?: any,
) =>
  request<BaseResponse<PaginatedList<ApplicationShort>>>(
    '/api/hr-panel/candidates/applications',
    {
      params,
      method: 'GET',
      ...options,
    },
  )

/* Получить отклик */
export const getHrApplicationRequest = (applicationId: number, options?: any) =>
  request<BaseResponse<Application>>(
    `/api/hr-panel/candidates/applications/${applicationId}`,
    {
      method: 'GET',
      ...options,
    },
  )


/* Отправить отклик */
export const postApproveApplicationRequest = (
  body: PostApproveApplicationRequestBody,
  options?: any,
) =>
  request<void>('api/variants/send-approve', {
    method: 'POST',
    body: body,
    ...options,
  })

export const createResumeFormFileRequest = (
  body: { file: any },
  options?: any,
) =>
  request<void>('api/resumes/create-from-file', {
    method: 'POST',
    body: body,
    ...options,

  })


  export const applyVacancyRequest = (vacancyId: number, options?: any) =>
    request<any>(`/api/vacancies/apply?vacancy_id=${vacancyId}`, {
      method: 'POST',
      ...options,
    })

  export const getCompanyMessagesRequest = (companyId: number, options?: any) =>
    request<BaseResponse<ChatMessage[]>>(`api/messages/companies/${companyId}`, {
      method: "GET",
      ...options,
    })


  export const getAvailableSlotsRequest = (body: IGetAvailableSlots, options?: any) =>
    request('/api/hr-panel/calendar/get-available-slots', {
      method: "POST",
      ...options,
      body: body
    })
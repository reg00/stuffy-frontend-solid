/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddPurchaseEntry {
  /** @minLength 1 */
  name: string
  /** @format double */
  cost: number
  /** @format double */
  amount: number
  /** @format uuid */
  eventId: string
  /** @format uuid */
  participantId: string
  purchaseTags?: PurchaseTagShortEntry[] | null
  /** @format uuid */
  unitTypeId: string
  isPartial: boolean
}

export interface ErrorResponse {
  message?: string | null
  errors?: Record<string, string[]>
}

export interface EventShortEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
  description?: string | null
  /** @format date-time */
  eventDateStart: string
  isCompleted: boolean
  /** @format uri */
  imageUri?: string | null
}

export interface EventShortEntryResponse {
  data?: EventShortEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

export enum FileType {
  Jpg = 'Jpg',
  Jpeg = 'Jpeg',
  Png = 'Png',
  Pdf = 'Pdf',
  Txt = 'Txt',
  Doc = 'Doc',
  Docx = 'Docx',
  Xls = 'Xls',
  Xlsx = 'Xlsx',
  Link = 'Link',
}

export interface FriendsRequestShort {
  /** @format uuid */
  id?: string
  userIdFrom?: string | null
  userIdTo?: string | null
  userNameFrom?: string | null
  userNameTo?: string | null
}

export interface GetDebtEntry {
  /** @format uuid */
  id?: string
  /** @format double */
  amount?: number
  isSent?: boolean
  isComfirmed?: boolean
  event?: EventShortEntry
  borrower?: UserShortEntry
  debtor?: UserShortEntry
}

export interface GetDebtEntryResponse {
  data?: GetDebtEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

export interface GetEventEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
  description?: string | null
  /** @format date-time */
  createdDate: string
  /** @format date-time */
  eventDateStart: string
  /** @format date-time */
  eventDateEnd?: string | null
  isCompleted: boolean
  /** @format uri */
  mediaUri?: string | null
  user: UserShortEntry
  participants?: ParticipantShortEntry[] | null
  purchases?: PurchaseShortEntry[] | null
  medias?: MediaShortEntry[] | null
}

export interface GetMediaEntry {
  /** @format uuid */
  id?: string
  fileType?: FileType
  fileName?: string | null
  mediaType?: MediaType
  link?: string | null
  event?: EventShortEntry
}

export interface GetParticipantEntry {
  /** @format uuid */
  id: string
  user: GetUserEntry
  event: EventShortEntry
  purchases?: PurchaseShortEntry[] | null
  purchaseUsages?: PurchaseUsageShortEntry[] | null
}

export interface GetPurchaseEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
  /** @format double */
  cost: number
  /** @format double */
  amount: number
  isPartial: boolean
  isComplete: boolean
  event: EventShortEntry
  purchaseTags?: PurchaseTagShortEntry[] | null
  unitType: UnitTypeShortEntry
  purchaseUsages?: PurchaseUsageShortEntry[] | null
  participant?: ParticipantShortEntry
}

export interface GetPurchaseEntryResponse {
  data?: GetPurchaseEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

export interface GetPurchaseTagEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
  purchases?: PurchaseShortEntry[] | null
}

export interface GetPurchaseUsageEntry {
  /** @format uuid */
  id: string
  participant: ParticipantShortEntry
  purchase: PurchaseShortEntry
  /** @format int32 */
  amount?: number
}

export interface GetUnitTypeEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
  purchases?: PurchaseShortEntry[] | null
}

export interface GetUserEntry {
  id?: string | null
  name?: string | null
  email?: string | null
  role?: string | null
  firstName?: string | null
  middleName?: string | null
  lastName?: string | null
  phone?: string | null
  /** @format uri */
  imageUri?: string | null
}

export interface IdentityRole {
  id?: string | null
  name?: string | null
  normalizedName?: string | null
  concurrencyStamp?: string | null
}

export interface LoginModel {
  /** @minLength 1 */
  username: string
  /** @minLength 1 */
  password: string
}

export interface MediaShortEntry {
  /** @format uuid */
  id?: string
  fileType?: FileType
  fileName?: string | null
  mediaType?: MediaType
  link?: string | null
}

export enum MediaType {
  Image = 'Image',
  Video = 'Video',
  Audio = 'Audio',
  Document = 'Document',
  Link = 'Link',
  Unknown = 'Unknown',
}

export interface ParticipantShortEntry {
  /** @format uuid */
  id: string
  name?: string | null
  /** @format uri */
  imageUri?: string | null
}

export interface ParticipantShortEntryResponse {
  data?: ParticipantShortEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

export interface PurchaseShortEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
  /** @format double */
  cost: number
  /** @format double */
  amount: number
  isPartial: boolean
  isComplete: boolean
  purchaseTags?: PurchaseTagShortEntry[] | null
  unitType?: UnitTypeShortEntry
}

export interface PurchaseTagShortEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
}

export interface PurchaseTagShortEntryResponse {
  data?: PurchaseTagShortEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

export interface PurchaseUsageShortEntry {
  /** @format uuid */
  purchaseUsageId: string
  /** @format uuid */
  purchaseId?: string
  /** @format uuid */
  participantId?: string
  /** @format int32 */
  amount?: number
}

export interface PurchaseUsageShortEntryResponse {
  data?: PurchaseUsageShortEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

export interface RegisterModel {
  /** @minLength 1 */
  username: string
  /**
   * @format email
   * @minLength 1
   */
  email: string
  /** @minLength 1 */
  password: string
}

export interface UnitTypeShortEntry {
  /** @format uuid */
  id: string
  /** @minLength 1 */
  name: string
}

export interface UnitTypeShortEntryResponse {
  data?: UnitTypeShortEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

export interface UpdateEventEntry {
  /** @minLength 1 */
  name: string
  description?: string | null
  /** @format date-time */
  eventDateStart: string
  /** @format date-time */
  eventDateEnd?: string
}

export interface UpdateModel {
  /** @minLength 1 */
  username: string
  firstName?: string | null
  middleName?: string | null
  lastName?: string | null
  /** @format tel */
  phone?: string | null
}

export interface UpdatePurchaseEntry {
  /** @minLength 1 */
  name: string
  /** @format double */
  cost: number
  /** @format double */
  amount: number
  isPartial: boolean
  purchaseTags?: PurchaseTagShortEntry[] | null
  /** @format uuid */
  unitTypeId: string
}

export interface UpsertParticipantEntry {
  /** @format uuid */
  eventId: string
  /** @minLength 1 */
  userId: string
}

export interface UpsertPurchaseTagEntry {
  /** @minLength 1 */
  name: string
}

export interface UpsertPurchaseUsageEntry {
  /** @format uuid */
  purchaseId: string
  /** @format uuid */
  participantId: string
  /** @format int32 */
  amount?: number | null
}

export interface UpsertUnitTypeEntry {
  /** @minLength 1 */
  name: string
}

export interface UserEntry {
  id?: string | null
  name?: string | null
  email?: string | null
  role?: string | null
  firstName?: string | null
  middleName?: string | null
  lastName?: string | null
  phone?: string | null
  /** @format uri */
  imageUri?: string | null
}

export interface UserShortEntry {
  id?: string | null
  name?: string | null
  /** @format uri */
  imageUri?: string | null
}

export interface UserShortEntryAuthResponse {
  data?: UserShortEntry[] | null
  /** @format int32 */
  totalPages?: number
  /** @format int32 */
  total?: number
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    })
  }
}

/**
 * @title StuffyHelper.Hosting
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Authorization
     * @name AuthRegisterCreate
     * @summary ?????????????????????? ????????????????????????
     * @request POST:/api/auth/register
     * @secure
     */
    authRegisterCreate: (data: RegisterModel, params: RequestParams = {}) =>
      this.request<string, ErrorResponse>({
        path: `/api/auth/register`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthEmailConfirmList
     * @request GET:/api/auth/email-confirm
     * @secure
     */
    authEmailConfirmList: (
      query?: {
        login?: string
        code?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<GetUserEntry, ErrorResponse>({
        path: `/api/auth/email-confirm`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthLoginCreate
     * @summary ??????????
     * @request POST:/api/auth/login
     * @secure
     */
    authLoginCreate: (data: LoginModel, params: RequestParams = {}) =>
      this.request<GetUserEntry, ErrorResponse>({
        path: `/api/auth/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthLogoutCreate
     * @summary ??????????
     * @request POST:/api/auth/logout
     * @secure
     */
    authLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/logout`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthResetPasswordCreate
     * @summary ???????????????? ???? email ???????????? ???? ?????????? ????????????
     * @request POST:/api/auth/reset-password
     * @secure
     */
    authResetPasswordCreate: (
      query: {
        /** @format email */
        Email: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/auth/reset-password`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthResetPasswordConfirmList
     * @request GET:/api/auth/reset-password-confirm
     * @secure
     */
    authResetPasswordConfirmList: (
      query?: {
        code?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/auth/reset-password-confirm`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthResetPasswordConfirmCreate
     * @summary ?????????? ????????????. ?????????????????????? ?????????? ????????, ?????? ?????????????????? ???? ???????????? ???? ????????.
     * @request POST:/api/auth/reset-password-confirm
     * @secure
     */
    authResetPasswordConfirmCreate: (
      query: {
        /** @format email */
        Email: string
        /** @format password */
        Password: string
        /** @format password */
        ConfirmPassword?: string
        Code?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/auth/reset-password-confirm`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthRolesList
     * @summary ???????????? ??????????
     * @request GET:/api/auth/roles
     * @secure
     */
    authRolesList: (params: RequestParams = {}) =>
      this.request<IdentityRole, ErrorResponse>({
        path: `/api/auth/roles`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthIsAdminList
     * @summary ???????????????? ???????????????????????? ???? ????????????????????????????
     * @request GET:/api/auth/is-admin
     * @secure
     */
    authIsAdminList: (params: RequestParams = {}) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/auth/is-admin`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthAccountList
     * @summary ?????????????????? ???????????? ?? ????????????????????????
     * @request GET:/api/auth/account
     * @secure
     */
    authAccountList: (params: RequestParams = {}) =>
      this.request<GetUserEntry, ErrorResponse>({
        path: `/api/auth/account`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthUsersList
     * @summary ???????????? ???????????????????????????????????? ??????????????????????????
     * @request GET:/api/auth/users
     * @secure
     */
    authUsersList: (
      query?: {
        userName?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<UserEntry[], ErrorResponse>({
        path: `/api/auth/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthEditPartialUpdate
     * @summary ?????????????????? ???????????? ????????????????????????
     * @request PATCH:/api/auth/edit
     * @secure
     */
    authEditPartialUpdate: (data: UpdateModel, params: RequestParams = {}) =>
      this.request<UserEntry, ErrorResponse>({
        path: `/api/auth/edit`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthAvatarCreate
     * @summary ?????????????????? ?????????????? ????????????????????????
     * @request POST:/api/auth/avatar
     * @secure
     */
    authAvatarCreate: (
      data: {
        /** @format binary */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<any, ErrorResponse>({
        path: `/api/auth/avatar`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authorization
     * @name AuthAvatarDelete
     * @summary ???????????????? ?????????????? ????????????????????????
     * @request DELETE:/api/auth/avatar
     * @secure
     */
    authAvatarDelete: (params: RequestParams = {}) =>
      this.request<any, ErrorResponse>({
        path: `/api/auth/avatar`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Debt
     * @name DebtsList
     * @summary ?????????????????? ???????????? ????????????
     * @request GET:/api/debts
     * @secure
     */
    debtsList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDebtEntryResponse, ErrorResponse | void>({
        path: `/api/debts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsList
     * @summary ?????????????????? ???????????? ??????????????
     * @request GET:/api/events
     * @secure
     */
    eventsList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
        name?: string
        description?: string
        /** @format date-time */
        createdDateStart?: string
        /** @format date-time */
        createdDateEnd?: string
        /** @format date-time */
        eventDateStartMin?: string
        /** @format date-time */
        eventDateStartMax?: string
        /** @format date-time */
        eventDateEndMin?: string
        /** @format date-time */
        eventDateEndMax?: string
        userId?: string
        isCompleted?: boolean
        isActive?: boolean
        /** @format uuid */
        participantId?: string
        /** @format uuid */
        purchaseId?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<EventShortEntryResponse, ErrorResponse | void>({
        path: `/api/events`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsCreate
     * @summary ???????????????????? ????????????
     * @request POST:/api/events
     * @secure
     */
    eventsCreate: (
      data: {
        Name: string
        /** @format date-time */
        EventDateStart: string
        /** @format binary */
        File?: File
        Description?: string
        /** @format date-time */
        EventDateEnd?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<EventShortEntry, ErrorResponse>({
        path: `/api/events`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsDetail
     * @summary ?????????????????? ???????????? ???? ?????? ????????????????????????????
     * @request GET:/api/events/{eventId}
     * @secure
     */
    eventsDetail: (eventId: string, params: RequestParams = {}) =>
      this.request<GetEventEntry, ErrorResponse | void>({
        path: `/api/events/${eventId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsDelete
     * @summary ???????????????? ????????????
     * @request DELETE:/api/events/{eventId}
     * @secure
     */
    eventsDelete: (eventId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/events/${eventId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsPartialUpdate
     * @summary ?????????????????? ???????????? ???? ????????????
     * @request PATCH:/api/events/{eventId}
     * @secure
     */
    eventsPartialUpdate: (eventId: string, data: UpdateEventEntry, params: RequestParams = {}) =>
      this.request<EventShortEntry, ErrorResponse>({
        path: `/api/events/${eventId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsPhotoDelete
     * @summary ???????????????? ?????????????? ????????????
     * @request DELETE:/api/events/{eventId}/photo
     * @secure
     */
    eventsPhotoDelete: (eventId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/events/${eventId}/photo`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsPhotoPartialUpdate
     * @summary ???????????????????? ?????????????? ????????????
     * @request PATCH:/api/events/{eventId}/photo
     * @secure
     */
    eventsPhotoPartialUpdate: (
      eventId: string,
      data: {
        /** @format binary */
        file?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<EventShortEntry, ErrorResponse>({
        path: `/api/events/${eventId}/photo`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsCompleteCreate
     * @summary ???????????????????? ????????????
     * @request POST:/api/events/{eventId}/complete
     * @secure
     */
    eventsCompleteCreate: (eventId: string, params: RequestParams = {}) =>
      this.request<EventShortEntry, ErrorResponse>({
        path: `/api/events/${eventId}/complete`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsReopenCreate
     * @summary ???????????????????? ????????????
     * @request POST:/api/events/{eventId}/reopen
     * @secure
     */
    eventsReopenCreate: (eventId: string, params: RequestParams = {}) =>
      this.request<EventShortEntry, ErrorResponse>({
        path: `/api/events/${eventId}/reopen`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name EventsCheckoutCreate
     * @summary ???????????? ???????????? ???? ????????????
     * @request POST:/api/events/{eventId}/checkout
     * @secure
     */
    eventsCheckoutCreate: (eventId: string, params: RequestParams = {}) =>
      this.request<any, ErrorResponse>({
        path: `/api/events/${eventId}/checkout`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Friends
     * @name FriendsList
     * @summary ?????????????????? ???????????? ????????????
     * @request GET:/api/friends
     * @secure
     */
    friendsList: (
      query?: {
        /**
         * @format int32
         * @default 20
         */
        limit?: number
        /**
         * @format int32
         * @default 0
         */
        offset?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<UserShortEntryAuthResponse, ErrorResponse | void>({
        path: `/api/friends`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FriendsRequest
     * @name RequestsSendedList
     * @summary ?????????????????? ???????????? ???????????????????????? ???????????? ?? ????????????
     * @request GET:/api/requests/sended
     * @secure
     */
    requestsSendedList: (params: RequestParams = {}) =>
      this.request<FriendsRequestShort[], ErrorResponse | void>({
        path: `/api/requests/sended`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FriendsRequest
     * @name RequestsIncomingList
     * @summary ?????????????????? ???????????? ???????????????? ???????????? ?? ????????????
     * @request GET:/api/requests/incoming
     * @secure
     */
    requestsIncomingList: (params: RequestParams = {}) =>
      this.request<FriendsRequestShort[], ErrorResponse | void>({
        path: `/api/requests/incoming`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FriendsRequest
     * @name RequestsDetail
     * @summary ?????????????????? ???????????????????? ?? ???????????? ?? ???????????? ???? ????????????????????????????
     * @request GET:/api/requests/{requestId}
     * @secure
     */
    requestsDetail: (requestId: string, params: RequestParams = {}) =>
      this.request<FriendsRequestShort, ErrorResponse | void>({
        path: `/api/requests/${requestId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags FriendsRequest
     * @name RequestsDelete
     * @summary ?????????????? ???????????? ?? ????????????
     * @request DELETE:/api/requests/{requestId}
     * @secure
     */
    requestsDelete: (requestId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/requests/${requestId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags FriendsRequest
     * @name RequestsAcceptCreate
     * @summary ?????????????? ???????????? ?? ????????????
     * @request POST:/api/requests/{requestId}/accept
     * @secure
     */
    requestsAcceptCreate: (requestId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/requests/${requestId}/accept`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags FriendsRequest
     * @name RequestsCreate
     * @summary ?????????????????? ???????????? ?? ????????????
     * @request POST:/api/requests
     * @secure
     */
    requestsCreate: (
      query: {
        userId: string
      },
      params: RequestParams = {}
    ) =>
      this.request<FriendsRequestShort, ErrorResponse>({
        path: `/api/requests`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Media
     * @name MediaFormFileCreate
     * @summary ???????????????????? ?????????? ?? ????????????
     * @request POST:/api/media/form-file
     * @secure
     */
    mediaFormFileCreate: (
      data: {
        /** @format uuid */
        EventId: string
        /** @format binary */
        File?: File
        MediaType: MediaType
        Link?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<GetMediaEntry, ErrorResponse>({
        path: `/api/media/form-file`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Media
     * @name MediaFormFileDetail
     * @summary ?????????????????? ??????????
     * @request GET:/api/media/{mediaId}/form-file
     * @secure
     */
    mediaFormFileDetail: (mediaId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/media/${mediaId}/form-file`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Media
     * @name MediaMetadataDetail
     * @summary ?????????????????? ???????????????????? ??????????
     * @request GET:/api/media/{mediaId}/metadata
     * @secure
     */
    mediaMetadataDetail: (mediaId: string, params: RequestParams = {}) =>
      this.request<GetMediaEntry, ErrorResponse>({
        path: `/api/media/${mediaId}/metadata`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Media
     * @name MediaDelete
     * @summary ???????????????? ??????????
     * @request DELETE:/api/media/{mediaId}
     * @secure
     */
    mediaDelete: (mediaId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/media/${mediaId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Media
     * @name MediaMetadataList
     * @summary ?????????????????? ???????????? ???????????????????? ????????????
     * @request GET:/api/media/metadata
     * @secure
     */
    mediaMetadataList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
        /** @format uuid */
        eventId?: string
        /** @format date-time */
        createdDateStart?: string
        /** @format date-time */
        createdDateEnd?: string
        mediaType?: MediaType
      },
      params: RequestParams = {}
    ) =>
      this.request<GetMediaEntry[], ErrorResponse>({
        path: `/api/media/metadata`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Participant
     * @name ParticipantsList
     * @summary ?????????????????? ???????????? ???????????????????? ????????????
     * @request GET:/api/participants
     * @secure
     */
    participantsList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
        /** @format uuid */
        eventId?: string
        userId?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ParticipantShortEntryResponse, ErrorResponse | void>({
        path: `/api/participants`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Participant
     * @name ParticipantsCreate
     * @summary ???????????????????? ??????????????????
     * @request POST:/api/participants
     * @secure
     */
    participantsCreate: (data: UpsertParticipantEntry, params: RequestParams = {}) =>
      this.request<ParticipantShortEntry, ErrorResponse>({
        path: `/api/participants`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Participant
     * @name ParticipantsDetail
     * @summary ?????????????????? ?????????????????? ???????????? ???? ????????????????????????????
     * @request GET:/api/participants/{participantId}
     * @secure
     */
    participantsDetail: (participantId: string, params: RequestParams = {}) =>
      this.request<GetParticipantEntry, ErrorResponse | void>({
        path: `/api/participants/${participantId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Participant
     * @name ParticipantsDelete
     * @summary ???????????????? ??????????????????
     * @request DELETE:/api/participants/{participantId}
     * @secure
     */
    participantsDelete: (participantId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/participants/${participantId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Participant
     * @name ParticipantsPartialUpdate
     * @summary ?????????????????? ?????????????????? ???????????? (?????????? ?????? ?????? ????)
     * @request PATCH:/api/participants/{participantId}
     * @secure
     */
    participantsPartialUpdate: (participantId: string, data: UpsertParticipantEntry, params: RequestParams = {}) =>
      this.request<ParticipantShortEntry, ErrorResponse>({
        path: `/api/participants/${participantId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchasesList
     * @summary ?????????????????? ???????????? ??????????????
     * @request GET:/api/purchases
     * @secure
     */
    purchasesList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
        name?: string
        /** @format double */
        costMin?: number
        /** @format double */
        costMax?: number
        /** @format uuid */
        eventId?: string
        purchaseTags?: string[]
        /** @format uuid */
        unitTypeId?: string
        isComplete?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<GetPurchaseEntryResponse, ErrorResponse | void>({
        path: `/api/purchases`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchasesCreate
     * @summary ???????????????????? ??????????????
     * @request POST:/api/purchases
     * @secure
     */
    purchasesCreate: (data: AddPurchaseEntry, params: RequestParams = {}) =>
      this.request<PurchaseShortEntry, ErrorResponse>({
        path: `/api/purchases`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchasesDetail
     * @summary ?????????????????? ???????????? ?? ?????????????? ???? ????????????????????????????
     * @request GET:/api/purchases/{purchaseId}
     * @secure
     */
    purchasesDetail: (purchaseId: string, params: RequestParams = {}) =>
      this.request<GetPurchaseEntry, ErrorResponse | void>({
        path: `/api/purchases/${purchaseId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchasesDelete
     * @summary ???????????????? ??????????????
     * @request DELETE:/api/purchases/{purchaseId}
     * @secure
     */
    purchasesDelete: (purchaseId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/purchases/${purchaseId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Purchase
     * @name PurchasesPartialUpdate
     * @summary ?????????????????? ???????????? ?? ??????????????
     * @request PATCH:/api/purchases/{purchaseId}
     * @secure
     */
    purchasesPartialUpdate: (purchaseId: string, data: UpdatePurchaseEntry, params: RequestParams = {}) =>
      this.request<PurchaseShortEntry, ErrorResponse>({
        path: `/api/purchases/${purchaseId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseTag
     * @name PurchaseTagsList
     * @summary ?????????????????? ???????????? ?????????? ??????????????
     * @request GET:/api/purchase-tags
     * @secure
     */
    purchaseTagsList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
        name?: string
        /** @format uuid */
        purchaseId?: string
        isActive?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<PurchaseTagShortEntryResponse, ErrorResponse | void>({
        path: `/api/purchase-tags`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseTag
     * @name PurchaseTagsCreate
     * @summary ???????????????????? ???????? ??????????????
     * @request POST:/api/purchase-tags
     * @secure
     */
    purchaseTagsCreate: (data: UpsertPurchaseTagEntry, params: RequestParams = {}) =>
      this.request<PurchaseTagShortEntry, ErrorResponse>({
        path: `/api/purchase-tags`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseTag
     * @name PurchaseTagsDetail
     * @summary ?????????????????? ???????????? ???????? ??????????????
     * @request GET:/api/purchase-tags/{purchaseTagId}
     * @secure
     */
    purchaseTagsDetail: (purchaseTagId: string, params: RequestParams = {}) =>
      this.request<GetPurchaseTagEntry, ErrorResponse | void>({
        path: `/api/purchase-tags/${purchaseTagId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseTag
     * @name PurchaseTagsDelete
     * @summary ???????????????? ???????? ??????????????
     * @request DELETE:/api/purchase-tags/{purchaseTagId}
     * @secure
     */
    purchaseTagsDelete: (purchaseTagId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/purchase-tags/${purchaseTagId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseTag
     * @name PurchaseTagsPartialUpdate
     * @summary ?????????????????? ???????? ??????????????
     * @request PATCH:/api/purchase-tags/{purchaseTagId}
     * @secure
     */
    purchaseTagsPartialUpdate: (purchaseTagId: string, data: UpsertPurchaseTagEntry, params: RequestParams = {}) =>
      this.request<PurchaseTagShortEntry, ErrorResponse>({
        path: `/api/purchase-tags/${purchaseTagId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseUsage
     * @name PurchaseUsagesList
     * @summary ?????????????????? ???????????? ????????, ?????????? ?????????????????? ?????????? ???????????????? ????????????????????
     * @request GET:/api/purchase-usages
     * @secure
     */
    purchaseUsagesList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
        /** @format uuid */
        eventId?: string
        /** @format uuid */
        participantId?: string
        /** @format uuid */
        purchaseId?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<PurchaseUsageShortEntryResponse, ErrorResponse | void>({
        path: `/api/purchase-usages`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseUsage
     * @name PurchaseUsagesCreate
     * @summary ???????????????????? ?????????????????????????? ???????????????????? ????????????????
     * @request POST:/api/purchase-usages
     * @secure
     */
    purchaseUsagesCreate: (data: UpsertPurchaseUsageEntry, params: RequestParams = {}) =>
      this.request<PurchaseUsageShortEntry, ErrorResponse>({
        path: `/api/purchase-usages`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseUsage
     * @name PurchaseUsagesDetail
     * @summary ?????????????????? ???????????? ???? ?????????????????????????? ???????????????????? ???????????????? ???? ????????????????????????????
     * @request GET:/api/purchase-usages/{purchaseUsageId}
     * @secure
     */
    purchaseUsagesDetail: (purchaseUsageId: string, params: RequestParams = {}) =>
      this.request<GetPurchaseUsageEntry, ErrorResponse | void>({
        path: `/api/purchase-usages/${purchaseUsageId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseUsage
     * @name PurchaseUsagesDelete
     * @summary ???????????????? ?????????????????????????? ???????????????????? ????????????????
     * @request DELETE:/api/purchase-usages/{purchaseUsageId}
     * @secure
     */
    purchaseUsagesDelete: (purchaseUsageId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/purchase-usages/${purchaseUsageId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags PurchaseUsage
     * @name PurchaseUsagesPartialUpdate
     * @summary ?????????????????? ?????????????????????????? ???????????????????? ???????????????? (?? ???????? ??????)
     * @request PATCH:/api/purchase-usages/{purchaseUsageId}
     * @secure
     */
    purchaseUsagesPartialUpdate: (
      purchaseUsageId: string,
      data: UpsertPurchaseUsageEntry,
      params: RequestParams = {}
    ) =>
      this.request<PurchaseUsageShortEntry, ErrorResponse>({
        path: `/api/purchase-usages/${purchaseUsageId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags UnitType
     * @name UnitTypesList
     * @summary ?????????????????? ???????????? ???????????? ??????????????????
     * @request GET:/api/unit-types
     * @secure
     */
    unitTypesList: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        offset?: number
        /**
         * @format int32
         * @default 10
         */
        limit?: number
        name?: string
        /** @format uuid */
        purchaseId?: string
        isActive?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<UnitTypeShortEntryResponse, ErrorResponse | void>({
        path: `/api/unit-types`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags UnitType
     * @name UnitTypesCreate
     * @summary ???????????????????? ?????????????? ??????????????????
     * @request POST:/api/unit-types
     * @secure
     */
    unitTypesCreate: (data: UpsertUnitTypeEntry, params: RequestParams = {}) =>
      this.request<UnitTypeShortEntry, ErrorResponse>({
        path: `/api/unit-types`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags UnitType
     * @name UnitTypesDetail
     * @summary ?????????????????? ???????????????????? ?? ?????????????? ?????????????????? ???? ????????????????????????????
     * @request GET:/api/unit-types/{unitTypeId}
     * @secure
     */
    unitTypesDetail: (unitTypeId: string, params: RequestParams = {}) =>
      this.request<GetUnitTypeEntry, ErrorResponse | void>({
        path: `/api/unit-types/${unitTypeId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags UnitType
     * @name UnitTypesDelete
     * @summary ???????????????? ?????????????? ??????????????????
     * @request DELETE:/api/unit-types/{unitTypeId}
     * @secure
     */
    unitTypesDelete: (unitTypeId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/unit-types/${unitTypeId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UnitType
     * @name UnitTypesPartialUpdate
     * @summary ?????????????????? ?????????????? ??????????????????
     * @request PATCH:/api/unit-types/{unitTypeId}
     * @secure
     */
    unitTypesPartialUpdate: (unitTypeId: string, data: UpsertUnitTypeEntry, params: RequestParams = {}) =>
      this.request<UnitTypeShortEntry, ErrorResponse>({
        path: `/api/unit-types/${unitTypeId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  }
}

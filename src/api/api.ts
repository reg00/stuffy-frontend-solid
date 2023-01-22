import { Api } from './__generated__/stuffyHelperApi'

const { api, instance } = new Api({ baseURL: '/api', withCredentials: true })

export {instance}

export default api

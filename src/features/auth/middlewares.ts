import { Navigator } from '@solidjs/router'
import { AxiosInstance } from 'axios'


function setupAxiosInterceptors(axiosInstance: AxiosInstance, navigate: Navigator): void {
  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response.status === 401) {
        navigate('/login', {replace: true})
      }
    }
  )
}

export default setupAxiosInterceptors

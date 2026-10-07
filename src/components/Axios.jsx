import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})


const publicRoutes = ['login/', 'register/', 'token/refresh/']

AxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access')
    const isPublic = publicRoutes.some((r) => config.url.includes(r))

    if (token && !isPublic) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default AxiosInstance
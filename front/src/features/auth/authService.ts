import apiClient from '../../shared/api/apiClient'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  userId: number
  email: string
  fullName: string
  role: string
  token: string
  tokenType: string
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<any>('/auth/login', credentials)
    return response.data.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('fullName')
    localStorage.removeItem('role')
  },
}

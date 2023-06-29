import { safeTechApi } from '@/safetech/service/axios'

class ProfileService {
  async updateUserById(id, params) {
    try {
      const data = await safeTechApi.put(`/users/${id}`, params)
      return data
    } catch (error) {
      throw error
    }
  }

  async getUserById(id) {
    try {
      const data = await safeTechApi.get(`/users/${id}`)
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new ProfileService()

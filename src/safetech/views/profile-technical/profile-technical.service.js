import { safeTechApi } from '@/safetech/service/axios'

class TechnicalProfileService {
  async getReviewsByTechnicalId(id) {
    try {
      const data = await safeTechApi.get(`/reviews/technical/${id}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async getTechnicalById(id) {
    try {
      const data = await safeTechApi.get(`/technicals/${id}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async getAverageScoreByTechnicalId(id) {
    try {
      const data = await safeTechApi.get(`/technicals/averageScore/${id}`)
      return data
    } catch (error) {
      throw error
    }
  }
}

export default new TechnicalProfileService()

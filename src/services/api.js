/**
 * AXIOS
 * --------------------------------------
 * axios.request(config)
 * axios.get(url[, config])
 * axios.delete(url[, config])
 * axios.head(url[, config])
 * axios.options(url[, config])
 * axios.post(url[, data[, config]])
 * axios.put(url[, data[, config]])
 * axios.patch(url[, data[, config]])
 */

import axios from 'axios'

class API {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    })

    this.config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  }

  /* SETTERS */
  setToken(token) {
    this.config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  /* LOGIN */

  async login(username, password) {
    const response = await this.api.post('/login', { username, password })
    return response.data
  }

  /** MEALS */

  async getMeals(visible = null) {
    const response = await this.api.get(
      `/meals${visible !== null ? '?v=' + visible : ''}`,
      this.config
    )
    return response.data
  }

  async postMeal(meal) {
    const response = await this.api.post('/meals', meal, this.config)
    return response.data
  }

  async putMeal(meal, id) {
    const response = await this.api.put(`/meals/${id}`, meal, this.config)
    return !!response
  }

  async deleteMeal(id) {
    const response = await this.api.delete(`/meals/${id}`, this.config)
    return !!response
  }

  /** SCHEDULES */

  async getToday(date, time) {
    const response = await this.api.get(`/schedules/today/${date}/${time}`)
    return response.data
  }

  async getSchedules(month, year) {
    const response = await this.api.get(
      `/schedules?m=${month}&y=${year}`,
      this.config
    )
    return response.data
  }

  async postSchedule(schedule) {
    const response = await this.api.post(`/schedules/`, schedule, this.config)
    return response.data
  }

  async putSchedule(schedule, id) {
    const response = await this.api.put(
      `/schedules/${id}`,
      schedule,
      this.config
    )
    return !!response
  }

  async deleteSchedule(id) {
    const response = await this.api.delete(`/schedules/${id}`, this.config)
    return response.data
  }
}

export default new API()

const axios = require('axios').default;
import { BASE_URL, API_KEY } from './api-variables';

// 'https://api.themoviedb.org/3/trending/movie/week?api_key=fa50958034c24b0612c0304f24903582'

export default class filmotekaApiService {
  constructor() {
    this.searchquery = '';
    this.page = 1;
  }

  async getDataTrends() {
    try {
      const { data } = await axios.get(`${BASE_URL}/movie/week?api_key=${API_KEY}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMovieDetails(id) {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getDataSearch() {}

  get query() {
    return this.searchquery;
  }

  set query(newQuery) {
    this.searchquery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

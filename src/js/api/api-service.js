const axios = require('axios').default;
import { BASE_URL, API_KEY, SEARCH_URL } from './api-variables';

// 'https://api.themoviedb.org/3/trending/movie/week?api_key=fa50958034c24b0612c0304f24903582'

export default class filmotekaApiService {
  constructor() {
    this.searchquery = '';
    this.page = 1;
    this.totalPages = 0;
  }

  async getDataTrends() {
    try {
      const { data } = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getDataSearch(searchQuery, page) {
    try {
      const { data } = await axios.get(
        `${SEARCH_URL}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`,
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMovieDetails(id) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

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

/* Get year from release date */
function getYear(item) {
  return new Date(item).getFullYear();
}

/* Combine genres' ids with its names for render */
function getGenres(genreIdArr, genresArr) {
  const { genres } = genresArr;

  return genreIdArr
    .map(id => genres.filter(item => item.id === id))
    .slice(0, 3)
    .flat();
}

/* Updating result data before render */
function getMoviesWithYearAndGenres(data, genresArr) {
  return data.map(movie => ({
    ...movie,
    release_date: getYear(movie.release_date),
    genres: getGenres(movie.genre_ids, genresArr),
  }));
}

export { getYear, getGenres, getMoviesWithYearAndGenres };

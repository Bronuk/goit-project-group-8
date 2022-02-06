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
    poster_path:
      movie.poster_path == null
        ? 'https://i.pinimg.com/originals/74/3d/b2/743db230d891b47c1d8c66b161111b91.jpg'
        : movie.poster_path,
    release_date: getYear(movie.release_date),
    genres: getGenres(movie.genre_ids, genresArr),
  }));
}

export { getYear, getGenres, getMoviesWithYearAndGenres };

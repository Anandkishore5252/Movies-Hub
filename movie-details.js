document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "5d56eb8225b94efe4aac789696a427b9";
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  const movieTitle = document.getElementById("movie-title");
  const moviePoster = document.getElementById("movie-poster");
  const movieOverview = document.getElementById("movie-overview");
  const movieReleaseDate = document.getElementById("movie-release-date");
  const movieRating = document.getElementById("movie-rating");

  const fetchMovieDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    try {
      const response = await fetch(url);
      const movie = await response.json();
      movieTitle.textContent = movie.title;
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      movieOverview.textContent = movie.overview;
      movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
      movieRating.textContent = `Rating: ${movie.vote_average}`;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  if (movieId) {
    fetchMovieDetails(movieId);
  } else {
    movieTitle.textContent = "Movie not found";
  }

  const closeButton = document.getElementById("close-btn");

  closeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

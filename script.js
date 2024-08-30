document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "5d56eb8225b94efe4aac789696a427b9";
  const movieList = document.getElementById("movie-list");
  const searchInput = document.getElementById("search");
  let movies = [];

  const fetchMovies = async () => {
    const numberOfPages = 5;
    let allMovies = [];

    for (let page = 1; page <= numberOfPages; page++) {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        allMovies = allMovies.concat(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    movies = allMovies;
    renderMovies(movies);
  };

  const renderMovies = (moviesToRender) => {
    movieList.innerHTML = "";
    if (moviesToRender.length === 0) {
      movieList.innerHTML = "<p>No movies found.</p>";
      return;
    }
    moviesToRender.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
      movieCard.addEventListener("click", () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      });
      movieList.appendChild(movieCard);
    });
  };

  const handleSearch = () => {
    const query = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    renderMovies(filteredMovies);
  };

  fetchMovies();

  searchInput.addEventListener("input", handleSearch);
});

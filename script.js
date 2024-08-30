document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '5d56eb8225b94efe4aac789696a427b9';
  const accountId = '21471116';
  const sessionId = 'your_session_id'; // Replace with your session ID

  const movieList = document.getElementById('movie-list');
  const searchInput = document.getElementById('search');
  const favoritesContent = document.getElementById('favorites-content');

  let movies = [];
  let favorites = [];

  // Function to fetch movies from API
  const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
      try {
          const response = await fetch(url);
          const data = await response.json();
          movies = data.results;
          renderMovies(movies);
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  };

  // Function to render movies on the page
  const renderMovies = (moviesToRender) => {
      movieList.innerHTML = '';
      if (moviesToRender.length === 0) {
          movieList.innerHTML = '<p>No movies found.</p>';
          return;
      }
      moviesToRender.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.className = 'movie-card';
          movieCard.innerHTML = `
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h3>${movie.title}</h3>
              <button class="favorite-btn" data-movie-id="${movie.id}" aria-label="Add to Favorites">&#9734;</button>
          `;
          movieCard.querySelector('.favorite-btn').addEventListener('click', () => {
              toggleFavorite(movie.id, movie.title, movie.poster_path);
          });
          movieList.appendChild(movieCard);
      });
  };

  // Function to handle search
  const handleSearch = () => {
      const query = searchInput.value.toLowerCase();
      const filteredMovies = movies.filter(movie => 
          movie.title.toLowerCase().includes(query)
      );
      renderMovies(filteredMovies);
  };

  // Function to toggle favorite status
  const toggleFavorite = async (movieId, title, posterPath) => {
      const favoriteBtn = document.querySelector(`.favorite-btn[data-movie-id="${movieId}"]`);
      const isFavorited = favoriteBtn.classList.toggle('favorited');

      const options = {
          method: isFavorited ? 'POST' : 'DELETE',
          headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
              'Authorization': `Bearer your_access_token` // Replace with your access token
          },
          body: JSON.stringify({
              media_type: 'movie',
              media_id: movieId,
              favorite: isFavorited
          })
      };

      try {
          await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`, options);
          if (isFavorited) {
              favorites.push({ id: movieId, title, poster_path: posterPath });
          } else {
              favorites = favorites.filter(fav => fav.id !== movieId);
          }
          updateFavoritesCart();
      } catch (error) {
          console.error('Error toggling favorite:', error);
      }
  };

  // Function to update the favorites cart
  const updateFavoritesCart = () => {
      favoritesContent.innerHTML = '';
      favorites.forEach(fav => {
          const movieCard = document.createElement('div');
          movieCard.className = 'movie-card';
          movieCard.innerHTML = `
              <img src="https://image.tmdb.org/t/p/w500${fav.poster_path}" alt="${fav.title}">
              <h3>${fav.title}</h3>
          `;
          favoritesContent.appendChild(movieCard);
      });
  };

  // Fetch initial movies
  fetchMovies();

  // Search event listener
  searchInput.addEventListener('input', handleSearch);

  // Fetch favorite movies from API
  const fetchFavorites = async () => {
      try {
          const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}&session_id=${sessionId}`, {
              method: 'GET',
              headers: {
                  'accept': 'application/json',
                  'Authorization': `Bearer your_access_token` // Replace with your access token
              }
          });
          const data = await response.json();
          favorites = data.results.map(movie => ({ id: movie.id, title: movie.title, poster_path: movie.poster_path }));
          updateFavoritesCart();
      } catch (error) {
          console.error('Error fetching favorites:', error);
      }
  };

  fetchFavorites();
});

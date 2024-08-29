document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5d56eb8225b94efe4aac789696a427b9'; // Replace with your actual API key
    const movieList = document.getElementById('movie-list');
    const searchInput = document.getElementById('search');
    let movies = [];
  
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
            `;
            movieCard.addEventListener('click', () => {
                window.location.href = `movie-details.html?id=${movie.id}`;
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
  
    // Fetch initial movies
    fetchMovies();
  
    // Search event listener
    searchInput.addEventListener('input', handleSearch);
  });
  
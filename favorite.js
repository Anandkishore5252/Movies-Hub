document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5d56eb8225b94efe4aac789696a427b9';
    const accountId = '21471116';
    const sessionId = '21471116'; // Replace with your session ID

    const favoritesList = document.getElementById('favorites-list');

    // Function to fetch favorite movies from API
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
            renderFavorites(data.results);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    // Function to render favorite movies on the page
    const renderFavorites = (favorites) => {
        favoritesList.innerHTML = '';
        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p>No favorite movies found.</p>';
            return;
        }
        favorites.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            favoritesList.appendChild(movieCard);
        });
    };

    // Fetch and render favorite movies
    fetchFavorites();
});

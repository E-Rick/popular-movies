import axios from 'axios';

// Fetching functions for the TMDB API

/**
 * 
 * @param {number} year - the year the movies were released
 * @param {string} sortValue - the sort_by value (accepted values: popularity.asc, popularity.desc, release_date.asc, release_date.desc)
 */
export async function fetchByYear(year = '2020', sortValue = 'desc') {
	try {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env
			.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.${sortValue}&include_adult=false&certification_country=US&page=1&primary_release_year=${year}`;
		const { data: { results } } = await axios.get(url);
		const tenMovies = results.slice(0, 10);
		return tenMovies;
	} catch (error) {
		throw new Error(error);
	}
}

/**
 * 
 * @param {string} id - ID of the movie to fetch 
 */
export async function fetchById(id) {
	try {
		const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env
			.REACT_APP_TMDB_API_KEY}&append_to_response=videos`;
		const { data } = await axios.get(url);
		return data;
	} catch (error) {
		throw new Error(error);
	}
}

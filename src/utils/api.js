const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const getPopularMovies = async (x) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&include_adult=false&language=en-US&page=${x}`);
    const data = await response.json()
    return data.results
}

export const searchMovies = async(query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false&language=en-US&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export const getUpcomingMovies = async (x) => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&include_adult=false&language=en-US&page=${x}`);
    const data = await response.json()
    return data.results;
}

export const getMovieGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`);
    const data = await response.json()
    return data;
}

export const getMovieTrailer = async(movieID) => {
    const response = await fetch (`${BASE_URL}/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`)
    const data = await response.json()
    return data;
}

export const getMovieSpecificInfo = async(movieID) => {
    const response = await fetch (`${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=en-US`)
    const data = await response.json()
    return data;
}
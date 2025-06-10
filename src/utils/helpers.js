
const parseMovieData = (movie) => {
    return {
        "id" : movie.id,
        "title" : movie.title,
        "poster" : movie.poster_path,
        "overview" : movie.overview,
        "release_date" : movie.release_date,
        "rating" : movie.vote_average,
        "backdrop" : movie.backdrop_path,

    }
}

export default parseMovieData;

const parseMovieData = (movie) => {
    return {
        "id" : movie.id,
        "title" : movie.title,
        "image" : movie.poster_path,
        "overview" : movie.overview,
        "release_date" : movie.release_date,
        "rating" : movie.vote_average
    }
}

export default parseMovieData;
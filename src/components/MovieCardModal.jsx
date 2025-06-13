import { getMovieTrailer } from '../utils/api';
import { useState, useEffect } from 'react';
import "../css-components/movie-modal.css"



const MovieCardModal = ({content, isOpen, handleOpen, setMovieModalContent}) => {
    const movie = content;
    
    const [videoInfo, setVideoInfo] = useState();

     useEffect(() => {
        if (content)    {
            loadMovieVidoeData(movie.id);
        }
    }, [content])

    const loadMovieVidoeData = async (id) => {
        const videoData = await getMovieTrailer(id);
        const trailer = videoData.results.filter(obj => obj.type.toLowerCase().includes("trailer"))
        setVideoInfo(trailer[0]) 
    }

   

    // console.log(videoInfo)

    const getMovieGenresFromDetails = (genres) => {
        let genreNames = [];
        if (genres) {
            
            for (let genre of genres) {
                const name = genre.name
                genreNames.push(name)
            }
        }
        return genreNames;
    }

    const convertMovieRuntime = (runtime) => {
        let minutes = Math.floor(runtime);
        let seconds = (runtime - minutes) * 60;
        
        return `${minutes} minutes and ${Math.round(seconds)} seconds`;
    }

    const handleModalClick = () => {
        handleOpen(false);
        setMovieModalContent(null);
    }


    return (
        <>
       {content && <div className='modal-container' onClick={handleModalClick}>
            <div className='modal'> 
                <div className='modal-content'>
                    <span className='close' onClick={handleModalClick}>&times;</span>
                    <h1>{movie.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} display="flex" alt={movie.title}/>
                    <h3>Release Date: {movie.release_date}</h3>
                    <p><b>Runtime:</b> {convertMovieRuntime(movie.runtime)}</p>
                    <p><b>Overview:</b> {movie.overview}</p>
                    <p><b>Genres:</b> {getMovieGenresFromDetails(movie.genres).join(" | ")}</p>
                    {videoInfo && 
                        <iframe className='trailer-video'
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoInfo.key}`}
                            title={videoInfo.name}
                            allowFullScreen /> }
                </div>
            </div>
        </div>}
        </>
    )
    
}

export default MovieCardModal;
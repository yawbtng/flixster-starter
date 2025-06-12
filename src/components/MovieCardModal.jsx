import { getMovieTrailer } from '../utils/api';
import { useState, useEffect } from 'react';
import "../css-components/movie-modal.css"



const MovieCardModal = ({content, isOpen, handleOpen, setMovieModalContent}) => {
    const movie = content;
    
    const [videoInfo, setVideoInfo] = useState();

    const loadMovieVidoeData = async (id) => {
        const videoData = await getMovieTrailer(id);
        console.log(videoData.results)
        const trailer = videoData.results.filter(obj => obj.type.toLowerCase().includes("trailer"))
        console.log("ALL TRAILERS")
        console.log(trailer)
        console.log("FIRST TRAILER")
        console.log(trailer[0])
        console.log(trailer[0].key)
        setVideoInfo(trailer[0]) 
    }

    useEffect(() => {
        if (content)    {
            loadMovieVidoeData(movie.id);
        }
        console.log("OPENNNN")
    }, [content, isOpen])

    console.log(videoInfo)

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
        setMovieModalContent("Loading...");
    }

    console.log("hahhahahahhahahahhaha")
    console.log(videoInfo)

    return (

        <div className='modal-container' onClick={handleModalClick}>
            <div className='modal'> 
                <div className='modal-content'>
                    <span className='close' onClick={handleModalClick}>&times;</span>
                    <h1>{movie.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} display="flex" alt={movie.title}/>
                    <h3>Release Date: {movie.release_date}</h3>
                    <p><b>Runtime:</b> {convertMovieRuntime(movie.runtime)}</p>
                    <p><b>Overview:</b> {movie.overview}</p>
                    <p><b>Genres:</b> {getMovieGenresFromDetails(movie.genres).join(" | ")}</p>
                    {/* movieModalContent && 
                        <iframe 
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoInfo.key}`}
                            title={videoInfo.name}
                            frameborder="0"
                            allowFullScreen /> */}
                </div>
            </div>
        </div>
        // <div className='modal-container' onClick={handleModalClick}>
        //     <div className='modal' >
        //         <div className='modal-content'>
        //             <span className='close' onClick={handleModalClick}>&times;</span>
        //             <h1>{movie.title}</h1>
        //             <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title}/>
        //             <h3>Release Date: {movieDate(movie.release_date)}</h3>
        //             <p><b>Overview:</b> {movie.overview}</p>
        //             <p><b>Runtime:</b> {convertMovieRuntime(movie.runtime)}</p>
        //             {/* <p><b>Genres:</b> {getMovieGenresFromDetails(movie.genres).join(" | ")}</p> */}
        //             <h4>Genres:</h4>

        //             {/* <iframe 
        //                 width="560"
        //                 height="315"
        //                 src={`https://www.youtube.com/embed/${videoInfo}`}
        //                 title={videoInfo.name}
        //                 frameborder="0"
        //                 allowFullScreen
        //             /> */}

        //         </div>
        //     </div>
        // </div>
    )
}

export default MovieCardModal;
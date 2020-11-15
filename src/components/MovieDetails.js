import React, { useEffect, useState } from 'react';
import { fetchMovieDetail, fetchMovieVideos, fetchMovieCasts, fetchSimilarMovie } from '../service';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import ReactStars from 'react-rating-stars-component';
import {Link} from "react-router-dom";
import avatar from "../../src/notavailable.jpg";
import {withRouter} from "react-router-dom";
import NavbarComponent from "./NavbarComponent";


function MovieDeatils({match}) {
    let params = match.params;
    let genres = []
    const [detail, setDetail] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [video, setVideo] = useState([]);
    const [isBusy, setisBusy] = useState(true);
    const [casts, setCasts] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideos(params.id));
            setCasts(await fetchMovieCasts(params.id));
            setSimilarMovies(await fetchSimilarMovie(params.id));
            setisBusy(false);
            window.scrollTo(0,0);
        };

        fetchAPI();
    }, [params.id])

    genres = detail.genres;

    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=';
        return (
           <Modal
           {...props}
           size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered
           >
            <Modal.Header closeButton>
                 <Modal.Title
                 id="contained-modal-title-vcenter"
                 style={{color: 'black', fontWeight: 'bolder'}}
                 >
                {detail.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '00000'}}>
                {video ?
                <ReactPlayer
                className="container-fluid"
                url={youtubeUrl + video.key}
                playing
                width="100%"
                controls="true"
                >
                </ReactPlayer>
                : <div style={{color: "black", fontWeight: 'bolder'}}>No video available! :(</div>}
            </Modal.Body>
           </Modal> 
        )
    }

 

    let genreList;
    if(genres){
        genreList = genres.map((g, i) => {
            return (
                <li className="list-inline-item" key={i}>
                    <button type="button" className="btn btn-outline-info">
                        {g.name}
                    </button>
                </li>
            );
        });
    }
    
    const castList = casts.slice(0, 4).map((c, i) => {
        console.log(casts);
        return (
            <div className="col-md-3" key={i}>
                {c.img.includes("w200null") ? <img className="img-fluid rounded-circle mx-auto d-block" src={avatar} /> :  <img className="img-fluid rounded-circle mx-auto d-block"  src={c.img} />}
                <p className="font-weight-bold text-center mt-2">{c.name}</p>
                <p className="font-weight-light text-center" style={{color: "white"}}>{c.character}</p>
            </div>
        )
    })

    const similarMoviesList = similarMovies.slice(0, 4).map((c, i) => {
        return (
            <div className="col-md-3 col-sm-6" key={i}>
            <div className="card">
                 <Link to={`/movie/${c.id}`}>
                     <img className="img-fluid" src={c.poster} alt={c.title}></img>
                 </Link>
            </div>
             <div className="mt-2">
                 <p style={{fontWeight: 'bolder'}}>{c.title}</p>
                 <p>Rated: {c.rating}</p>
                 <ReactStars
                     count={c.rating} 
                     size={20} 
                     color={'#f4c10f'}
                 />
             </div>
        </div>
        )
    })


    return(
        <>
         {isBusy ? (
              <div></div>
          ) : (
        <>
        <NavbarComponent />
        <div className="container">
            <div className="row">
                <MoviePlayerModal
                show={isOpen}
                onHide={() => {
                    setIsOpen(false);
                }}
                >
                </MoviePlayerModal>
                <div className="col text-center" style={{width: '100%'}}>
                    <img className="img-fluid" src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title} />
                        <div className="carousel-center">
                            <i 
                            className="far fa-play-circle" 
                            style={{fontSize: 95, color: '#f4c10f', cursor: 'pointer'}} 
                            onClick={() => setIsOpen(true)}>
                            </i>
                        </div>   
                        <div className="carousel-caption" style={{background: "rgba(0, 0, 0, 0.7)", borderRadius: "25px", padding: "10px"}} >
                            <h2 className="d-none d-md-block">{detail.title}</h2>
                            <p></p>
                        </div>
                    </div>
                </div>

            <div className="row mt-3">
                <div className="col">
                 
                    <p style={{color: '#5a606b', fontWeight: "bolder"}}>GENRE</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="text-center">
                        <ReactStars
                        count={detail.vote_average}
                        size={20}
                        color={'#f4c10f'}
                        >
                        </ReactStars>
                    </div>
                <div className="mt-3">
                    <p style={{color: '#5a606b', fontWeight: "bolder"}}>OVERVIEW</p>
                    {detail.overview}
                </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <p style={{color: "#5a606b", fontWeight: 'bolder'}}>RELEASE DATE</p>
                    <p style={{color: "#f4c10f"}}>{detail.release_date}</p>
                </div>
                <div className="col-md-3">
                    <p style={{color: "#5a606b", fontWeight: 'bolder'}}>RUN TIME</p>
                    <p style={{color: "#f4c10f"}}>{detail.runtime} minutes</p>
                </div>
                <div className="col-md-3">
                    <p style={{color: "#5a606b", fontWeight: 'bolder'}}>BUDGET</p>
                    {detail.budget > 0 ? (<p style={{color: "#f4c10f"}}>$ {detail.budget}</p>) : (<p style={{color: "#f4c10f"}}>N/A</p>)}
                    
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p style={{color: '#5a606b', fontWeight: "bolder"}}>CASTS</p>
                </div>
            </div>
            <div className="row mt-3">
                    {castList}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p style={{color: '#5a606b', fontWeight: "bolder"}}>SIMILAR MOVIES</p>
                </div>
            </div>
            <div className="row mt-3">
                {similarMoviesList}
            </div>

            <hr className="mt-5" style={{borderTop: "1px solid #5a606b"}}></hr>

            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6" style={{color:"#5a606b"}}>
                    <h3>ABOUT ME</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                           <a href="/" style={{color: "#f4c10f"}}>
                               <i className="fab fa-github"></i>
                           </a>
                        </li>
                    </ul>
                </div>  
                <div className="col-md-4 col-sm-6" style={{color:"#5a606b"}}>
                  <h3>KEEP IN TOUCH</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <i className="fas fa-map-marker-alt"></i> Address: Plovdiv, Bulgaria
                            </p>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
        </>
        )}
    </>
    );
}

export default withRouter(MovieDeatils);
import React, { useEffect, useState, } from 'react';
import { fetchGenre, fetchMovies, fetchMovieByGenre, fetchPersons, fetchTopratedMovie, fetchByName } from '../service';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import Postermovies from './Postermovies';


 function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [isBusy, setisBusy] = useState(true);
    const [genres, setGenres] = useState([]);
    const [moviesByGenre, setmoviesByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setToprated] = useState([]);
    const [moviesByName, setMoviesByName] = useState([]);
    const [searchMessage, setSearchMessage] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());  
            setmoviesByGenre(await fetchMovieByGenre(28));
            setPersons(await fetchPersons());
            setToprated(await fetchTopratedMovie());
            setisBusy(false);
        };
      
        fetchAPI();
    }, []);

    
    const handleGenreClick = async (genre_id) => {
        setmoviesByGenre(await fetchMovieByGenre(genre_id));
    }

    const handleInput = e => {
        let nameInput=e.target.value;
        setName(prevState => {
            return {...prevState, name: nameInput};
          });
    }

    const  search = async (e) => {
        if(e.key === "Enter") {
         setMoviesByName(await fetchByName(e.target.value));
         if(moviesByName.length === 0){
             setSearchMessage("Nothing was found :(");
         }
        }
      }

   const genreList = genres.map((item, index) => {
    return (
        <li className="list-inline-item" key={index}>
            <button type="button" className="btn btn-outline-info" onClick={() => {
                handleGenreClick(item.id)
            }}>
            {item.name}
            </button>
        </li>
    )
   })

   let searchResults;
   if(moviesByName) {
       searchResults = moviesByName.slice(0, 4).filter((item) => !item.poster.includes("null")).map((item, index) => {
        return (
            
            <div className="col-md-3 col-sm-6" key={index}>     
                <div className="card">
               
                    <Link to={`/movie/${item.id}`}>
                   <img className="img-fluid mx-auto d-block"  src={item.poster} />
                    </Link>
                </div>
                <div className="mt-2">
                    <p style={{fontWeight: 'bolder'}}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars
                        count={item.rating} 
                        size={20} 
                        color={'#f4c10f'}
                    />
                </div>
            </div> 
        )
    })
   }

   const movieList = moviesByGenre.slice(0, 8).map((item, index) => {
       return (
           <div className="col-md-3 col-sm-6 mt-3" key={index}>
               <div className="card">
                    <Link to={`/movie/${item.id}`}>
                    <img className="img-fluid" src={item.poster} alt={item.title}></img>
                    </Link>
               </div>
                <div className="mt-1">
                    <p style={{fontWeight: 'bolder'}}>{item.title}</p>
                    <p>Rated: {item.rating}</p>
                    <ReactStars
                        count={item.rating} 
                        size={20} 
                        color={'#f4c10f'}
                    />
                </div>
           </div>
       )
   })

   const trendingPersons = persons.slice(0, 4).map((p, i) => {
    return(
        <div className="col-md-3" key={i}>
            <img className="img-fluid rounded-circle mx-auto d-block" src={p.profileImg} alt={p.name} />
        <p className="font-weight-bold text-center mt-2">{p.name}</p>
        </div>
    )
   })

   const topRatedList = topRated.slice(0, 4).map((p, i) => {
       return (
           <div className="col-md-3" key={i}>
               <div className="card">
                    <Link to={`/movie/${p.id}`}>
                        <img className="img-fluid" src={p.poster} alt={p.title}></img>
                    </Link>
               </div>
               <div className="mt-2">
                    <p style={{fontWeight: 'bolder'}}>{p.title}</p>
                    <p>Rated: {p.rating}</p>
                    <ReactStars
                        count={p.rating} 
                        size={20} 
                        color={'#f4c10f'}
                    />
                </div>
           </div>
       )
   })

    return ( 
        <>
          {isBusy ? (
              <div></div>
          ) : (
          <div className="container">
          <div className="row">
              <div className="col">
                <Postermovies nowPlaying={nowPlaying} />
              </div>
          </div>

          <div className="searchbox-wrap">
            <input type="text" 
            placeholder="Search for a movie..." 
            className="searchbox"
            name="search" 
            required
            onChange={handleInput}
            onKeyPress={search} />
          </div>

           <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>   
            </div> 
 
            
            {searchResults && searchResults.length > 0 ? (<div className="font-weight-bold" style={{color: '#5a606b'}}>Search results:</div>) 
            : (<div className="font-weight-bold" style={{color: '#5a606b'}}> {searchMessage} </div>) }

            <div className="row mt-3"> {searchResults} </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="fa fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            
            <div className="row mt-3">
                {movieList}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b'}}>
                        TRENDING ACTORS ON THIS WEEK
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="fa fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                {trendingPersons}
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b'}}>TOP RATED MOVIES</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="fa fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                {topRatedList}
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
          )}
       </>
    )
    
}

export default Home;

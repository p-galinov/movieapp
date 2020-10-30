import React, { memo } from 'react';
import Carousel from "react-bootstrap/Carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from 'react-router-dom';

 function Postermovies({nowPlaying}) {

    const randomIndex = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    let startIndex = randomIndex(15);
    let endIndex = startIndex + 5;

    const posterMovies = nowPlaying.slice(startIndex, endIndex).map((item) =>  {
        return (
         <Carousel.Item> 
             <Link to={`/movie/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
             <img
             className="d-block w-100"
             src={item.backPoster}
             alt="First slide"
             />    
             </Link>
             <Carousel.Caption className="d-none d-md-block" style={{background: "rgba(0, 0, 0, 0.7)", borderRadius: "25px", padding: "10px"}}>
             <h3>{item.title}</h3>
             <p >{item.overview}</p>
             </Carousel.Caption>
          </Carousel.Item>
        )
    });

    return (
        <Carousel>
          {posterMovies}
        </Carousel>
    )
 }

 export default memo(Postermovies);
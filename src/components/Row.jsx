import axoisInstance from '../config'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import StarsIcon from '@mui/icons-material/Stars'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

const Row = ( props ) => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        let unmounted = false
        async function fetchData () {
            const req = await axoisInstance.get(props.fetchurl)
            if (!unmounted) return setMovies(req.data.results)
            
            return req
        }
        fetchData()

        return () => {
            unmounted = true
        }
    }, [props.fetchurl])

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 0
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 3,
              infinite: true
            }
          }
        ]
    }

    function truncate (str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '..' : str
    }

    if (movies) {
        return (
            <>
                <div style={{ maxheight: '250px' }}><br/>
                    <h2>{ props.title }</h2>
                    <MovieRow {...settings}>
                        {movies.map(movie => (
                        <div key={movie.id}>
                            <Link to={`/movie/${movie.id}/${movie.first_air_date ? 'show' : 'movie'}`}>
                                <Conatiner>
                                    <Image
                                        className="image"
                                        src={`${baseUrl}${movie.poster_path}`}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.jpg' }}
                                        loading = 'lazy'
                                        alt=" "
                                    />
                                    <Hover className="info">
                                        <h5>{movie?.title || movie?.original_title || movie?.name}<span><StarsIcon style={{ fontSize: '14px' }}/>&nbsp;{movie?.vote_average}</span></h5>
                                        <p>{truncate(movie?.overview, 50)}</p><br/>
                                    </Hover>
                                </Conatiner>
                            </Link>
                        </div>
                        ))}
                    </MovieRow>
                </div>
            </>
        )
    }

}

const MovieRow = styled(Slider)`
    cursor: pointer;

    & > button {
        opacity: 0;
        height: 100%;
        width: 5vw;
        z-index: 1;
    }

    &:hover button{
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }

    .slick-track {
      overflow: hidden;
    }

    .slick-list {
       overflow: initial;
    }
  
    .slick-prev{
        left: -5vw;
    }

    .slick-next{
        right: -5vw;
    }


    div {
        position: relative;
        border: none;
        padding-left: 5px;
        min-height: 204px;
        max-height: 260px;

        @media (min-width : 1024px){
            max-height: 200px;
            padding-left: -5px;
        }
     
   }

   @media (max-width : 739px){

    .slick-next{
        display: none;
    }

    div {
        min-height: 260px;
    }

}
    
`
const Conatiner = styled.div`
    position: relative;
    height: 250px;

    &:hover .info{
        opacity: 1;
    }

    &:hover .image{
        transform: scale(1.15);
    }

    .info {

        @media (max-width : 1023px){
            display: none;  
        }
    }
`

const Hover = styled.div`
   width: 115%;
   border-radius: 10px;
   height: 100% auto;
   position: absolute;
   background : linear-gradient(180deg, transparent, #283858, #0c111b,#000000);
   opacity: 0;
   left: 50%;
   transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
   transition: .5s ease;
   margin-bottom: 20%;

    h5 {
        font-size: 14px;
        margin-bottom: -8px;
    }

    span 
        margin-left: 1em;
    }

    p {
        font-size: 13px;
    }
`

const Image = styled.img`
    position: relative;
    display: block;
    backface-visibility: hidden;   
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 100ms 0s;
    transition: .5s ease;
    border-radius: 5px;

    @media (max-width : 739px){
        border-radius: 0px;
        padding-right: 6px;
        object-fit: contain;
    }
`


export default Row
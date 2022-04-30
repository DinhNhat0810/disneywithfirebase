/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import StarsIcon from '@mui/icons-material/Stars'


function SearchedMovies (props) {
    
  const baseUrl = 'https://image.tmdb.org/t/p/original/'
  
  function truncate (str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '..' : str
}

  return (
        <Container>
            <MovieContainer>
                {props.data && props.data.map(data => (
                            <Item key={data.id}>
                                <Link to={`/movie/${data.id}/${data.first_air_date ? 'show' : 'movie'}`} >
                                    <Image
                                        className="image"
                                        src={`${baseUrl}${data.poster_path}`}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.jpg' }}
                                        loading = 'lazy'
                                        alt=" "
                                    />
                                    <Hover className="info">
                                        <h5>{data?.title || data?.original_title || data?.name}<span><StarsIcon style={{ fontSize: '14px' }}/>&nbsp;{data?.vote_average}</span></h5>
                                        <p>{truncate(data?.overview, 50)}</p><br/>
                                    </Hover>
                                </Link>
                            </Item>
                ))}
            </MovieContainer>
        </Container>
  )
}

const Container = styled.div`

`
const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Item = styled.div`
    position: relative;
    width: 18%;
    padding: 16px 8px;
    

    &:hover .info{
        opacity: 1;
    }

    &:hover .image{
        transform: scale(1.05);
    }

    @media (max-width : 739px){
        width: 24%;
        padding: 14px 6px;
    }

    @media (max-width : 479px){
        width: 48%;
        padding: 8px 4px;
    }

    .info {

        @media (max-width : 1023px){
            display: none;  
        }
    }
`

const Hover = styled.div`
   width: 100%;
   border-radius: 10px;
   height: 100% auto;
   position: absolute;
   background : linear-gradient(180deg, transparent, #283858, #0c111b,#000000);
   opacity: 0;
   left: 50%;
   transform: translate(-50%, -80%);
    -ms-transform: translate(-50%, -80%);
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

export default SearchedMovies

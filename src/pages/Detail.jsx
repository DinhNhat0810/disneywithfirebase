import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import db from "../firebase"
import styled from "styled-components"
import axoisInstance from "../config"
import Row from '../components/Row'
import { selectUserEmail } from '../features/user/userSlice'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import YouTube from 'react-youtube'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton } from '@mui/material'
import Loading from '../components/Loading'

const baseUrl = 'https://image.tmdb.org/t/p/original/'


const Detail = ( props ) => {
    const { id } = useParams()
    const { category } = useParams()

    const request = {
        getDetails: `/movie/${id}?api_key=56c7d00eb5bef25677cf9e4bb94032c2&language=en-US`,
        fetchSimilar: `/movie/${id}/similar?api_key=56c7d00eb5bef25677cf9e4bb94032c2&page=1`,
        getShowDetails: `/tv/${id}?api_key=56c7d00eb5bef25677cf9e4bb94032c2&language=en-US`,
        getSimilarMovie: `/movie/${id}/similar?api_key=56c7d00eb5bef25677cf9e4bb94032c2&page=1`,
        getSimilarTv: `/tv/${id}/similar?api_key=56c7d00eb5bef25677cf9e4bb94032c2&language=en-US&page=1`,
        getRecommendedMovie: `/movie/${id}/recommendations?api_key=56c7d00eb5bef25677cf9e4bb94032c2&page=1`,
        getRecommendedTv: `/tv/${id}/recommendations?api_key=56c7d00eb5bef25677cf9e4bb94032c2&page=1`,
        getTrailerTv: `/tv/${id}/videos?api_key=56c7d00eb5bef25677cf9e4bb94032c2`,
        getTrailerMovie: `/movie/${id}/videos?api_key=56c7d00eb5bef25677cf9e4bb94032c2`
    }

    const [detail, setDetail] = useState({})
    const [similar, setSimilar] = useState('')
    const [recommend, setRecommend] = useState('')
    const [trailer, setTrailer] = useState('')
    const [trailerUrl, setTrailerUrl] = useState('')
    const useremail = useSelector(selectUserEmail)

    useEffect(() => {
        if (category === 'movie') {
            async function fetchData () {
                const req = await axoisInstance.get(request.getDetails)
                setDetail(req.data)
                setSimilar(request.getSimilarMovie)
                setRecommend(request.getRecommendedMovie)
                console.log(req.data)
                return req
            }
      
            async function fetchTrailer () {
                const req = await axoisInstance.get(request.getTrailerMovie)
                setTrailer(req.data.results)
                // console.log(req.data.results)
                return req
            }
            fetchData()
            fetchTrailer()
        } else {

            async function fetchData () {
                const req = await axoisInstance.get(request.getShowDetails)
                setDetail(req.data)
                setSimilar(request.getSimilarTv)
                setRecommend(request.getRecommendedTv)
                return req
            }
  
            async function fetchTrailer () {
                const req = await axoisInstance.get(request.getTrailerTv)
                // setTrailer(req.data.results)
                return req
            }
            fetchData()
            fetchTrailer()
        }

    }, [request.getDetails])
 
    const opts = {
        height: '600',
        width: '100%',
        playerVars: {
          autoplay: 1
        }
    }

    function hide () {
        setTrailerUrl('')
        document.getElementById('p').style.display = 'none'
        document.getElementById('p').style.width = '0vw'
        document.getElementById('p').style.height = '0vh'
        return 'a'
    }

    function addDataTrailer () {
        if (category === 'movie') {
            db.collection('user').doc(useremail).collection(category).doc(id).set({
                movieId: id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        if (category === 'show') {
            db.collection('user').doc(useremail).collection(category).doc(id).set({
                tvId: id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        play()

    }

    function play () {
        if (trailer.length > 0) {
            setTrailerUrl(trailer[0].key)
            document.getElementById('p').style.display = 'block'
            document.getElementById('p').style.width = '90vw'
            document.getElementById('p').style.height = '100vh'
        } else {
            document.getElementById('notrailer').style.visibility = 'visible'
            document.getElementById('notrailer').style.opacity = '1'
        }
        
    }

    


    if (detail && similar && recommend) {
        const genres = detail.genres.map(item => {
            return (
                item.name
            )
        })
        


        return (
            <Container>

                <center>
                    <Notrailer id = "notrailer">
                        <h2>Sorry! Trailer UnAvaialble</h2>
                    </Notrailer>
                </center>

                <Background>
                    <img alt={''} src={`${baseUrl}${detail?.backdrop_path || detail?.poster_path}`} />
                </Background>

                <ContentMeta>
                    <Title>{detail?.name || detail?.original_title || detail?.title }</Title>
                    <Controls>
                        <Player>
                            <img src="/images/play-icon-black.png" alt="" />
                            <span>Play</span>
                        </Player>
                        <a href="#p" onClick = {addDataTrailer}>
                            <Trailer>
                                <img src="/images/play-icon-white.png" alt="" />
                                <span>Trailer</span>
                            </Trailer>
                        </a>
                        <AddList>
                            <span />
                            <span />
                        </AddList>
                        <GroupWatch>
                            <div>
                            <img src="/images/group-icon.png" alt="" />
                            </div>
                        </GroupWatch>
                    </Controls>
                    <SubTitle>{`Release date: ${detail.release_date} - Country: ${detail.production_countries[0].name}`}</SubTitle>
                    <SubTitle>{`Genres: ${genres.join(', ')}`}</SubTitle>
                    <Description>{detail.overview}</Description>
                </ContentMeta>

               <div id = "p" style={{ marginTop: '20px', display: 'none' }}>
                    <IconButton style={{ float: 'right' }} onClick = {() => hide()}>
                        <HighlightOffIcon style={{ fontSize: '50px', color: '#d9534f' }}/>
                    </IconButton>
                    <TrailerVideo>
                            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
                    </TrailerVideo>
                </div> 

                <Row title = {'Recommended For you'} fetchurl = {recommend} />
                <Row title = {'Similar Movies'} fetchurl = {similar}/>

            </Container>
        )   
    } else {
        return (
                <Loading />
        )
    }
}

const Container = styled.div`
    position: relative;
    min-height: calc(100vh-250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
`

const Background = styled.div`
    left: 0px;
    opacity: 0.8;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: -1;

    img {
        width: 100vw;
        height: 100vh;

        @media (max-width: 739px) {
            object-fit: cover;
            object-position: center;
        }
    }
`

const ContentMeta = styled.div`
    max-width: 700px;
    margin-top: 100px;

`

const Title = styled.h1`
    line-height: 1.4;
    font-size: 50px;
    fot-weight : 800;
    padding: 16px 0px;
    margin: 0;
    color: rgb(249, 249, 249);
    text-shadow: 3px 3px 3px #000;

    @media (max-width: 739px) {
        font-size: 36px;
    }


`

const Controls = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    margin: 24px 0px;
    min-height: 56px;

    @media (max-width: 739px) {
        margin: 8px 0px;
    }

`

const Player = styled.button`
    font-size: 15px;
    margin: 0px 22px 0px 0px;
    padding: 0px 24px;
    height: 56px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1.8px;
    text-align: center;
    text-transform: uppercase;
    background: rgb (249, 249, 249);
    border: none;
    color: rgb(0, 0, 0);

    img {
        width: 32px;
    }

    &:hover {
        background: rgb(198, 198, 198);
    }

    @media (max-width: 768px) {
        height: 45px;
        padding: 0px 12px;
        font-size: 12px;
        margin: 0px 10px 0px 0px;
        
        img {
            width: 25px;
        }
    }
`;

const Trailer = styled(Player)`
    background: rgba(0, 0, 0, 0.3);
    color: rgb(249, 249, 249);
`

const AddList = styled.div`
    margin-right: 16px;
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;

    span {
        background-color: rgb(249, 249, 249);
        display: inline-block;

        &:first-child {
            height: 2px;
            transform: translate(1px, 0px) rotate(0deg);
            width: 16px;
        }

        &:nth-child(2) {
            height: 16px;
            transform: translateX(-8px) rotate(0deg);
            width: 2px;
        }
    }
`

const GroupWatch = styled.div`
    height: 44px;
    width: 44px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: white;

    div {
        height: 40px;
        width: 40px;
        background: rgb(0, 0, 0);
        border-radius: 50%;

        img {
            width: 100%;
        }
    }
`

const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 18px;
    margin-bottom: 4px;
    min-height: 20px;
    text-shadow: 2px 2px 2px #000;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 16px;
    padding: 16px 0px;
    color: rgb(249, 249, 249);
    text-shadow: 2px 2px 2px #000;

    @media (max-width: 768px) {
        padding: 0px;
        font-size: 14px;
    }
`

const TrailerVideo = styled.div`
    justify-content: center;
    align-items: center;
`

const Notrailer = styled.div`
    background-color: #f0ad4e;
    border-radius: 5px;
    width: 40%;
    height: 20% auto;
    text-align : center;
    padding: 3px;
    margin: 6px;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s ease-in;

    @media (max-width: 1000px) {
      width: 100%;
      margin: 3px;
      height: 10% ;
    }
`


export default Detail
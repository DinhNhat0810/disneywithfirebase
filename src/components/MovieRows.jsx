import React, { useEffect, useState } from 'react'
import Row from './Row'
import request from '../request'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUserEmail } from '../features/user/userSlice'
import db from '../firebase'

function MoviewRows ( props ) {

  const useremail = useSelector(selectUserEmail)
  const [movieId, setMovieId] = useState('')
  const [tvId, setTvId] = useState('')
  const APIkey = '56c7d00eb5bef25677cf9e4bb94032c2'

  
  useEffect(() => {
    let unmounted = false

    if (unmounted) return
    if (useremail) {
      db.collection('user')
        .doc(useremail)
        .collection('movie')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => (
          setMovieId(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data()
            })
          ))))

      db.collection('user')
        .doc(useremail)
        .collection('show')
        .onSnapshot((snapshot) => (
          setTvId(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data()
            })
          ))))
    }
    return () => unmounted = true
  }, [useremail])

  const req = {
    getRecommendedMovies: `/movie/${movieId && movieId[0]?.data.movieId}/recommendations?api_key=${APIkey}&page=1`,
    getRecommendedTvs: `/tv/${tvId && tvId[0]?.data.tvId}}/recommendations?api_key=${APIkey}&page=1`,
  }
  
  return (
        <Container>
            {movieId.length !== 0
              ? (
                <>
                  <Row title = {'Recommended movies for you'} fetchurl= {req.getRecommendedMovies} category = 'movie'/>
                </>
              ): (
                <None></None>
              )
            }

            {tvId.length !== 0
              ? (
                <>
                  <Row title = {'Recommended Tv show for you'} fetchurl= {req.getRecommendedTvs} category = 'show'/>
                </>
              ): (
                <None></None>
              )
            }

           <Row title = {'Latest & Trending'} fetchurl= {request.fetchTrending} />
            <Row title = {'Popular Shows'} fetchurl = {request.fetchPopularShows} category = 'show' />
            <Row title = {'Popular Movies'} fetchurl = {request.fetchPopularMovies} category= 'movie'/>
            <Row title = {'Top Rated Shows'} fetchurl= {request.fetchRatedShows} category = 'show'/>
            <Row title = {'Top Rated Movies'} fetchurl= {request.fetchTopratedMovies} category= 'movie'/>
            <Row title = {'Popular Movie in VietNam'} fetchurl= {request.fetchPopularMovieVn} category= 'movie'/>
            <Row title = {'Comingup'} fetchurl= {request.fetchUpcoming} category= 'movie'/> 
        </Container>
  )
}

const Container = styled.div`
  margin-bottom : 10vh;
`

const None = styled.div`
  display: none;
`
export default MoviewRows

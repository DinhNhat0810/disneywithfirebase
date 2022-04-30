import React, { useEffect, useState } from 'react'
import Row from './Row'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectUserEmail } from '../features/user/userSlice'
import db from '../firebase'
import { genresTv } from '../genreDataJson'

function TvPageRows ( props ) {

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
  
  return (
        <Container>
            {genresTv.genres.map((item,index) => {
              return (
                <Row key={index} title = {`${item.name} Tv show`} fetchurl= {`/discover/tv/?api_key=${APIkey}&with_genres=${item.id}&page=1`}></Row>
                )
            })
            }
        </Container>
  )
}

const Container = styled.div`
  margin-bottom : 10vh;
`

export default TvPageRows


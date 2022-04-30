import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axoisInstance from "../config"
import Loading from '../components/Loading'
import SearchedMovies from '../components/SearchedMovies'

const Genres = ( props ) => {
    const { category } = useParams()
    const { id } = useParams()
    const [data, setData] = useState('')
    const APIkey = '56c7d00eb5bef25677cf9e4bb94032c2'

    const request = {
        search: `/discover/movie/?api_key=${APIkey}&with_genres=${id}&pageNumber=1`
    }

    useEffect(() => {
        async function fetchData () {
            const req = await axoisInstance.get(request.search)
            setData(req.data.results)
            return req 
        }

        fetchData() 
    }, [id])

    if (data) {
        return (
            <Container>
                <h1>{category}</h1>
                <SearchedMovies data={data}/>
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
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
`



export default Genres
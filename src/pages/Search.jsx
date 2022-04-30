import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import axoisInstance from "../config"
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SearchedMovies from '../components/SearchedMovies'

const Search = () => {
    
    const [query, setQuery] = useState('')
    const [data, setData] = useState('')
    const [page, setPage] = useState(1)


    const request = {
        search: `/search/multi?api_key=56c7d00eb5bef25677cf9e4bb94032c2&query=${query}&page=${page}&include_adult=false`
    }

    useEffect(() => {
        if (query !== '') {
            async function fetchData () {
                const req = await axoisInstance.get(request.search)
                setData(req.data.results)
                return req 
            }
            fetchData()
        }


    }, [query,page])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                setPage(page + 1)
                document.documentElement.scrollTop = 0
            }
        }

        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [page])

    const handleClick = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        if (page > 1) {
            setPage(1)
        }
        setQuery(e.target.value)
    }


    return (
        <Container>
            <h1>Search</h1>
            <FormContainer>
                <Formthings>
                    <Form>
                        <IconButton onClick={handleClick} type="submit"><SearchIconCustom /></IconButton>
                        <input type="text" value = {query} onChange = {handleChange} placeholder="Type and click on search icon" />
                    </Form>
                </Formthings>
            </FormContainer>

            {data ? <SearchedMovies data={data}/> : '' }
            {!data && query
              ? <LoaderContainer>
                  <Loader
                        type='ThreeDots'
                        color='#fff'
                        height={60}
                        width={60}
                        timeout={100000}
                    />
                </LoaderContainer>
              : '' }
        </Container>

    )
}

const Container = styled.main`
    position: relative;
    min-height : 100vh;
    overflow: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
    &:-webkit-scrollbar{
        display: none;
    }

    h1 {
        font-size: 40px;
    }
    
    &:after {
        background: url("./assets/images/home-background.png") center center / cover
        no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }


`
const FormContainer = styled.div`
  margin-top: 25px;

`

const Formthings = styled.div`
  background-color: #0c111b;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
`

const Form = styled.form`
    input {
        outline: none;
        border:none;
        width: 85%;
        color: white;
        background-color: #0c111b;

        @media (max-width: 700px){
            width: 70%;
        }
    }
    button {
        width:
    }
`
const SearchIconCustom = styled(SearchIcon)`
    font-size: 40px;
    fon-weight: 800;
    color: white;
`

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 200px;
`

export default Search





































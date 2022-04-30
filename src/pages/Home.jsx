import styled from 'styled-components'
import ImgSlider from '../components/ImgSlider'
import Viewers from '../components/Viewers'
import MoviewRows from '../components/MovieRows'

const Home = () => {
  
    return (
        <Container>
            <ImgSlider/>
            <Viewers/>
            <MoviewRows/>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 70px;
    padding: 0 calc(3.5vw + 5px);
    padding-bottom: 100px;
    
    &:after {
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }

    @media (max-width: 739px) {
        padding: 0 calc(3.5vw - 8px);
    }
`


export default Home 
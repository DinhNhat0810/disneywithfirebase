import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { IconButton } from '@mui/material'

const Footer = ( props ) => {
    return (
        <Container>
            <Content>
                <Links>
                    <h5>About Disney+ Hotstar</h5>
                    <h5>Terms of Use</h5>
                    <h5>Privacy Policy</h5>
                    <h5>FAQ</h5>
                    <h5>Feedback</h5>
                    <h5>Careers</h5>
                </Links>
                <Info>
                    <p>
                        &copy; 2021 STAR All Rights Reserved. HBO, Home Box Office and all related channel and programming logos are service marks of, and all related programming visuals and elements are the property of, Home Box Office, Inc. All rights reserved.
                    </p>
                </Info>
            </Content>
            <Contact>
                <Socials>
                    <p>Connect with us</p>
                    <div>
                        <IconButton>
                            <Facebook style = {{ fontSize: '40px' }} />
                        </IconButton>
                        <IconButton>
                            <Twitter style = {{ fontSize: '40px' }} />
                        </IconButton>
                    </div>
                </Socials>
                <DownloadLink>
                    <p>Disney+ Hotstar App</p>
                    <Images>
                        <img src="/images/apple.png" />
                        <img src="/images/google.png" />
                    </Images>
                </DownloadLink>
            </Contact>
        </Container>
    )

}

const Container = styled.div`
    display: flex;
    margin-top: 26vh;
    padding: 0 24px;

    @media (max-width: 739px) {
        flex-direction: column;
        margin-top: 12vh;

    }
`

const Content = styled.div`
    width: 50%;

    @media (max-width: 739px) {
        width: 100%;
    }

`

const Links = styled.div`
    display: flex;
    flex-wrap: wrap;

    h5 {
        margin: 10px;
        cursor: pointer;
    }
`

const Info = styled.div`
    font-size: 14px;
    padding-left: 10px;
    
`

const Contact = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-around;

`

const Socials = styled.div`
    padding-bottom: 20px;
    
    p {
        margin: 0;
    }
`

const Facebook = styled(FacebookIcon)`
    cursor: pointer;
    color : #838285;
    
    &:hover{
        color : #0275d8;
    }
    
`
const Twitter = styled(TwitterIcon)`
    cursor: pointer;
    color : #838285;

    &:hover{
        color : #0275d8;
    }
    
`

const DownloadLink = styled.div`

    p {
        margin: 0;
    }
`

const Images = styled.div`

    img {
        max-width: 100px;
        max-height: 150px;
        cursor: pointer;
        margin: 4px;
    }

`



export default Footer
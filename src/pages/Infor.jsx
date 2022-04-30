import styled from "styled-components"
import { selectUserEmail, selectUserName } from '../features/user/userSlice'
import { useSelector } from 'react-redux'

const Infor = ( props ) => {
    const userEmail = useSelector(selectUserEmail)
    const userName = useSelector(selectUserName)



    return (
        <Container>
            <CardInfor>
                <h2>User information</h2>
                <p>Name: {userName}</p>
                <p>Email: {userEmail}</p>
            </CardInfor>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 100px;
    padding: 0 36px;

    

    @media (max-width: 739px) {
        padding: 36px 16px;
        margin-top: 100px;
    }
`

const CardInfor = styled.div`
    
    h2 {
        font-size: 50px;
        font-weight: bold;
        margin: 0;
    }

    @media (max-width: 739px) {
        h2 {
            font-size: 36px;
        }
    }


`





export default Infor
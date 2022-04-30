import { useEffect, useState } from "react"
import styled from 'styled-components'
import { auth, provider } from "../firebase"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from "react-router-dom"
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice"

const Header = ( props ) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)
    const [isActive, setActive] = useState(false)
    const [openSubNav, setOpenSubNav] = useState(false)


    useEffect(() => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUser(user)
          history.push("/home")
        }
      })
    }, [userName])

    const handleAuth = () => {
      if (!userName) {
        auth
          .signInWithPopup(provider)
          .then((result) => {
            setUser(result.user)
          })
          .catch((error) => {
            alert(error.message)
          });
      } else if (userName) {
        auth
          .signOut()
          .then(() => {
            dispatch(setSignOutState())
            history.push("/")
          })
          .catch((err) => alert(err.message))
      }
    }

    const setUser = (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      )
    }
 
    const handleToggleMenu = () => {
      setActive(!isActive)
    }

    const handleCloseMenu = () => {
      setActive(false)
    }

    const handleToggleSubNav = () => {
      setOpenSubNav(!openSubNav)
    }


    return (
        <Nav>
            <Link to="/home">
              <Logo>
                <img src="/images/logo.svg" alt="Disney+" />
              </Logo>
            </Link>

            {!userName ? (
              <Login onClick={handleAuth}>Login</Login>
            ) : (
              <>
                <OpenMobileMenu className="mobile__menu" onClick={handleToggleMenu}>
                  Browser <ArrowDropDownOutlinedIcon/>
                </OpenMobileMenu>
                <NavMenu className={isActive ? "nav__menu open" : "nav__menu"} >
                  <NavLink>
                    <Link to="/home" onClick={handleCloseMenu}>
                      <img src="/images/home-icon.svg" alt="HOME" />
                      <span>HOME</span>
                    </Link>
                    <Link to="/search" onClick={handleCloseMenu}>
                      <img src="/images/search-icon.svg" alt="SEARCH" />
                      <span>SEARCH</span>
                    </Link>
                    <MultiLink onClick={handleToggleSubNav}>
                      <img src="/images/original-icon.svg" alt="GENRES" />
                      <span>
                        GENRES
                        <Listcontent className={openSubNav ? "list-content open": "list-content"}>
                          <ArrowBackIcon className="back__menu" onClick={handleToggleSubNav}/>
                          <Link onClick={handleCloseMenu} to="/genre/28/Action">Action</Link>
                          <Link onClick={handleCloseMenu} to="/genre/16/Animation">Animation</Link>
                          <Link onClick={handleCloseMenu} to="/genre/35/Comedy">Comedy</Link>
                          <Link onClick={handleCloseMenu} to="/genre/80/Crime/">Crime</Link>
                          <Link onClick={handleCloseMenu} to="/genre/99/Documentary">Documentary</Link>
                          <Link onClick={handleCloseMenu} to="/genre/18/Drama">Drama</Link>
                          <Link onClick={handleCloseMenu} to="/genre/14/Fantasy">Fantasy</Link>
                          <Link onClick={handleCloseMenu} to="/genre/27/Horror">Horror</Link>
                        </Listcontent>
                      </span>
                    </MultiLink>
                    <Link to="/movies" onClick={handleCloseMenu}>
                      <img src="/images/movie-icon.svg" alt="MOVIES" />
                      <span>
                        MOVIES     
                      </span>
                    </Link>
                    <Link to="/series" onClick={handleCloseMenu}>
                      <img src="/images/series-icon.svg" alt="SERIES" />
                      <span>
                        SERIES
                      </span>
                    </Link>
                  </NavLink>
                  <CloseMobileMenu onClick={handleToggleMenu}>
                    <CloseIcon className="close__icon"/>
                  </CloseMobileMenu>
                </NavMenu>
                <SignOut>
                  <Link to="/infor" className="infop__link">
                    <UserImg src={userPhoto} alt={userName} />
                  </Link>
                  <ExitUser onClick={handleAuth}>
                    Sign out
                  </ExitUser>
                  <DropDown>
                    <span onClick={handleAuth}>Sign out</span>
                  </DropDown>
                </SignOut>
              </>
            )}
        </Nav>

    )
}


const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  z-index: 3;

  @media (max-width: 739px) {
    padding: 0 16px;
  }
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: flex;
  align-items: center;
  
  img {
    display: block;
    width: 100%;
  }
`

const NavMenu = styled.div`
  margin-right: auto;
  margin-left: 25px;
  z-index: 10;
  transition: all ease 0.4s;

  &.open {
    transform: translateY(0);
  }

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {

      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }

      .list-content {
        display: block;
        margin-top:10px;
      }
    }
  }

  @media (max-width: 739px) {
    background-color: #000;
    width: 100vw;
    height: 100vh;
    margin-right: 0;
    margin-left: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    transform: translateY(-800px);

    a {

      img {
        height: 26px;
        min-width: 26px;
        width: 26px;
        margin-right: 8px;
      }

      span {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
`

const NavLink = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;

  @media (max-width: 739px) {
    padding-top: 100px;
    height: 60%;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 35%;
    
    a {
      padding-bottom: 24px;
    }
  }
`

const OpenMobileMenu = styled.div`
  display: none;
  font-size: 16px;
  align-items: center;
  height: 100%;
  margin-left: 10px;
  cursor: pointer;

  @media (max-width: 739px) {
    display: flex;
  }

`

const CloseMobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;

  .close__icon {
    font-size: 50px;
    font-weight: bold;0
  }

  @media (max-width: 739px) {
    display: block;
  }

`

const MultiLink = styled.span `
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;

        @media (max-width: 739px) {
          display: none;
        }
      }

      @media (max-width: 739px ) {
        position: unset;
      }
    }

    &:hover {

      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }

      .list-content {
        display: block;
      }

      @media (max-width: 739px) {


      }

    }

  @media (max-width :739px) {

    padding-bottom: 24px;

    img {
      height: 26px;
      min-width: 26px;
      width: 26px;
      margin-right: 8px;
    }

    span {
      font-size: 24px;
      font-weight: bold;
    }
  }
`

const Listcontent = styled.div`
    position: absolute;
    min-width: 160px;
    z-index: 1;
    background-color: #111524;
    border-radius: 5px;
    margin-top: 10px;
    letter-spacing: 1.49px;
    z-index: 3;
    cursor: pointer;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,10);
    display: none;

    a {
      padding: 10px 15px;
      font-size: 13px;
      margin-right: -2px;
      display : block;
    }

    a:hover {
      background-color: rgb(0,0,0);

      @media (max-width: 739px) {
        background-color: transparent;
      }

    }

    &::before {
      position: absolute;
      top: -15px;
      content: "";
      display: block;
      height: 20px;
      width: 50%;
      background-color: transparent;
    }

    .back__menu {
      display: none;
      width: 50px;
      fill: #fff;
      height: 50px;
      top: 10px;
      left: 10px;
    }

    @media (max-width: 739px) {
      display: block;
      width: 100vw;
      height: 100vh;
      margin-top: 0;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
      padding-top: 40px;
      transform: translateX(-100%);
      transition: transform ease 0.4s;

      a {
        font-size: 16px;
        padding: 16px 0;
        display: block;
      }

      .back__menu {
        position: absolute;
        display: block;
      }

      &.open {
        transform: translateX(0);
      }
    }

`

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;


const UserImg = styled.img`
  height: 100%;
`

const DropDown = styled.div`
  position: absolute;
  display: none;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;

  @media (max-width: 1023px) {
    display: block;
  }
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 130px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;

  .infop__link {
    display: block;
    border-radius: 4px;
    height: 80%;
    overflow: hidden;
  }
  
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }

  @media (max-width: 1023px) {
    width: unset;
  }
`

const ExitUser = styled.div`
  padding: 8px 10px;
  border-radius: 4px;
  background-color: red;

  @media (max-width: 1023px) {
    display: none;
  }  

`


export default Header
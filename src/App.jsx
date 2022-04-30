import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from "./components/Login"
import Header from "./components/Header"
import './App.css'
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import Footer from "./components/Footer"
import Movies from "./pages/Movies"
import TvShows from "./pages/TvShows"
import Search from "./pages/Search"
import Genres from "./pages/Genres"
import { useSelector } from 'react-redux'
import { selectUserEmail } from './features/user/userSlice'
import Infor from "./pages/Infor"

function App() {

  const userEmail = useSelector(selectUserEmail)

  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/'>
            {!userEmail ? <Login/> : <Redirect to="/home" /> }
          </Route>
          <Route path="/home">
            {userEmail ? <Home/> : <Redirect to="/" /> }
          </Route>
          
          {userEmail &&
            <Switch>
                <Route path="/infor">
                  <Infor/>
                </Route>
                <Route path="/movies">
                  <Movies/>
                </Route>
                <Route path="/series">
                  <TvShows/>
                </Route>
                <Route path="/movie/:id/:category">
                  <Detail/>
                </Route>
                <Route path="/search">
                  <Search/>
                </Route>
                <Route path="/genre/:id/:category">
                  <Genres/>
                </Route>
            </Switch>
          }

        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;

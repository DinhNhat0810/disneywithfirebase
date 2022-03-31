import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./components/Login"
import Header from "./components/Header"
import './App.css'
import Home from "./components/Home";
import Detail from "./components/Detail";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path="/detail/:id">
            <Detail/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;

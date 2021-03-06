import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "./Homepage.css";
import axios from "axios";

// Importing Components
import News from "./components/News";
import Weather from "./components/Weather";
import Events from "./components/Events";
import Flights from "./components/Flights";
import Recipes from "./components/Recipes";
import Quotes from "./components/Quotes";

// Bootstrap React
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function App() {
  let [news, setNews] = useState([]);
  const [navbar, setNavbar] = useState(false);
  
  useEffect(() => {
    async function getNews() {
      let res = await axios.get(
        "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=YrxSelvAUjEcesUKWBypGGJC4gWF596y"
      );
      // console.log(res.data.results);
      setNews(res.data.results);
    } 
    getNews();
  }, []);

  const bg = () => {
    //console.log(window.scrollY)
    if(window.scrollY > 50){
      setNavbar(false)
    } else {
      setNavbar(true)
    }
  }

  window.addEventListener('scroll', bg)

  return (
    <div className="hero">

    {/* Navbar */}
      <Navbar id={navbar ? 'mainNavbar' : null} sticky="top" className="bg-light align-content-center" expand="lg">
      <Navbar.Brand className="logo" href="/home">The New Normal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end menu">
        <Nav className="justify-content-center" defaultActiveKey="#first">
          <Nav.Link href="/home" >Home</Nav.Link>
          <Nav.Link href="/news">News</Nav.Link>
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="/weather">Weather</Nav.Link>
          <Nav.Link href="/flight">Search Flights</Nav.Link>
          <Nav.Link href="/recipes">Cooking Recipes</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>


       

    {/* Switch and Routes  */}
    <div>
      <Switch> 
      <Route
          exact path="/home"
          render={(props) => <Quotes  />}
        ></Route>
        <Route
          exact path="/news"
          render={(props) => <News news={news} {...props} />}
        ></Route>
        <Route
          exact path="/weather"
          render={(props) => <Weather {...props} />}
        ></Route>
        <Route path="/events" render={(props) => <Events {...props} />}></Route>
        <Route
          exact path="/flight"
          render={(props) => <Flights {...props} />}
        ></Route>
        <Route
           exact path="/recipes"
          render={(props) => <Recipes {...props} />}
        ></Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;

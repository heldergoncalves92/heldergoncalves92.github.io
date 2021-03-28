import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import "./App.scss";

export enum Routes {
  Home = "/",
  About = "/about",
  Contact = "/contact",
}

const InnerNavbar = () => {
  return <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link><Link to={Routes.Home}> Home </Link></Nav.Link>
        <Nav.Link ><Link to={Routes.Contact} >Contact</Link></Nav.Link>
        <Nav.Link><Link to={Routes.About} >About</Link></Nav.Link>
      </Nav>     
    </Navbar>;
}

function App() {
  return (
      <Router>

        
         
          <hr />
          <Switch>
              <Route exact path={Routes.Home} component={Home} />
              <Route path={Routes.Contact} component={Contact} />
              <Route path={Routes.About} component={About} />
          </Switch>
      </Router>
  );
}

export default App;

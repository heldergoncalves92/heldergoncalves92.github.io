import './App.scss';
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import About from "./About/About";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export enum Routes {
  Home = "/",
  About = "/about",
  Contact = "/contact",
}

function App() {
  return (
      <Router>

        <h2>Welcome to React Router Tutorial</h2>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={Routes.Home} className="nav-link"> Home </Link></li>
            <li><Link to={Routes.Contact} className="nav-link">Contact</Link></li>
            <li><Link to={Routes.About} className="nav-link">About</Link></li>
          </ul>
          </nav>
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

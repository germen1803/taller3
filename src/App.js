import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MiComponente from './vistas/formulario/MiComponente';
import Integrantes from './vistas/Integrantes';


function App() {


  function Navbar() {
    return (
      <nav className="topnav">
        <Link to="/otro">Integrantes</Link>
        <Link to="/personas">Personas</Link>
      </nav>
    )
  }

  return (
    <Router>
      <Navbar />
        <Switch>
          <Route path="/otro" component={Integrantes} />
          <Route path="/personas" component={MiComponente} />
        </Switch>
    </Router>
  );

}

export default App;

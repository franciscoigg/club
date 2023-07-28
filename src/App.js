import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Formulario from './componentes/Formulario';
import Tienda from './componentes/Tienda';
import Contactanos from './componentes/Contactanos';
import Mapa from './componentes/Mapa';
import MostrarRegistros from './componentes/MostrarRegistros';

const Home = () => (
  <div>
    <h1>Bienvenido</h1>
    <p>Bienvenido</p>
  </div>
);

const NotFound = () => (
  <div>
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/formulario">Formulario</Link>
          </li>
          <li>
            <Link to="/tienda">Tienda</Link>
          </li>
          <li>
            <Link to="/contactanos">Contáctanos</Link>
          </li>
          <li>
            <Link to="/mapa">Mapa</Link>
          </li>
          <li>
            <Link to="/mostrar">Mostrar Registros</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/formulario" component={Formulario} />
        <Route path="/tienda" component={Tienda} />
        <Route path="/contactanos" component={Contactanos} />
        <Route path="/mapa" component={Mapa} />
        <Route path="/mostrar" component={MostrarRegistros} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

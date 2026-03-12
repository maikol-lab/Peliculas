import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Tendencias from './pages/peliculas/Tendencias';
import Detalle from './pages/peliculas/Detalle';
import Categorias from './pages/peliculas/Categorias';
import Peliculas from './pages/peliculas/Peliculas';
import Contact from './pages/peliculas/Contact';
import Busquedas from './pages/peliculas/Busquedas';
import Actores from './pages/peliculas/Actores';
import Estrenos from './pages/peliculas/Estrenos';
import ActoresPeliculas from './pages/peliculas/ActoresPeliculas';
import Error404 from './pages/Error404';

// animaciones;
import WOW from 'wow.js';


const App = () => {
  useEffect(() => {
    const wow = new WOW({ live: true });
    wow.init();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tendencias/:id" element={<Tendencias />} />
          <Route path="/categorias/:id/:tipo" element={<Categorias />} />
          <Route path="/detalle/:tipo/:id" element={<Detalle />} />
          <Route path="/peliculas/:id" element={<Peliculas />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/busquedas" element={<Busquedas />} />
          <Route path="/actores" element={<Actores />} />
          <Route path="/actores/:id" element={<Actores />} />
          <Route path="/estrenos" element={<Estrenos />} />
          <Route path="/actores/:id/peliculas" element={<ActoresPeliculas />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="*" element={<Inicio />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
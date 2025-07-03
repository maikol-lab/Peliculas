import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FiltroGenerosCine from './FiltroGenerosCine';
import FiltroGenerosTv from './FiltroGenerosTv';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  {/*Manejo de Envio Busquedas API Peliculas*/}
  const [txtbuscar, setTxtbuscar] = useState('');

  const manejoTxt = (event) => {
    setTxtbuscar(event.target.value);
  };

  const navigate = useNavigate();
  const manejoEnvio = (event) => {
    event.preventDefault();
    navigate('/busquedas', {
      state: txtbuscar,
    });

  };

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
        <symbol id="sun-fill" viewBox="0 0 16 16">
          <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </symbol>
        <symbol id="moon-stars-fill" viewBox="0 0 16 16">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
        </symbol>
      </svg>

      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid ">
          <img src="/logo.jpg" class="img-fluid mx-4" alt="Responsive image" width={150}  />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/inicio'} className="nav-link active" aria-current="page">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to={'/mejorvaloradascine'} className="nav-link active" aria-current="page">Mejor Valoradas Cine</Link>
              </li>
              <li className="nav-item">
                <Link to={'/recientes'} className="nav-link active" aria-current="page">Recientes</Link>
              </li>
              <li className="nav-item">
                <Link to={'/tendencias'} className="nav-link">Tendencias</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Generos TV
                </Link>
                <ul className="dropdown-menu">
                  <FiltroGenerosTv />
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Generos Cine
                </Link>
                <ul className="dropdown-menu">
                  <FiltroGenerosCine />
                </ul>
              </li>
            </ul>
            {/* Botón del tema */}
            <div className="d-flex align-items-center">
              <button className="btn btn-link nav-link me-5 bg-info" type="button" onClick={toggleTheme} aria-label="Cambiar tema">
                <svg className="bi" width="24" height="24" aria-hidden="true">
                  <use href={theme === 'light' ? '#moon-stars-fill' : '#sun-fill'}></use>
                </svg>
              </button>

              <form className="d-flex" role="search" onSubmit={manejoEnvio}>
                <input value={txtbuscar} onChange={manejoTxt} className="form-control me-sm-2 " type="text" placeholder="Buscar" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
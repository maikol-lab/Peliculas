import React from 'react'
import { Link } from 'react-router-dom'
import FiltroGenerosTv from '../filtro/FiltroGenerosTv'
import FiltroGenerosCine from '../filtro/FiltroGenerosCine'

const Navbar = () => {
    return (
        // 2. Agregamos animación de entrada y z-index alto para que no quede debajo de nada
        <div className="container-fluid nav-bar p-0 shadow-lg animate__animated animate__fadeInDown" style={{ zIndex: 1055, position: 'sticky', top: 0 }}>
            <div className="row gx-0 bg-dark px-5 align-items-center border-bottom border-danger">

                <div className="col-lg-3 d-none d-lg-block">
                    <nav className="navbar navbar-dark position-relative" style={{ width: 250 }}>

                        <button
                            className="navbar-toggler border-0 fs-4 w-100 px-0 text-start text-white"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#allCat"
                        >
                            <h4 className="m-0 fw-bold">
                                <i className="fa fa-film me-2 text-danger" />
                                Categorías
                            </h4>
                        </button>

                        <div className="collapse navbar-collapse rounded-bottom bg-black p-3" id="allCat">
                            <div className="navbar-nav ms-auto py-0">

                                <ul className="list-unstyled categories-bars text-white">

                                    <li>
                                        <div className="categories-bars-item d-flex justify-content-between">
                                            {/* Enlace para Acción - ID 28 */}
                                            <Link to="/categorias/28/cine" className="text-dark text-decoration-none transition-hover">
                                                🎬 Acción
                                            </Link>
                                            <span className="text-danger">(3)</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="categories-bars-item d-flex justify-content-between">
                                            {/* Enlace para Ciencia Ficción - ID 878 */}
                                            <Link to="/categorias/878/cine" className="text-dark text-decoration-none transition-hover">
                                                👽 Ciencia Ficción
                                            </Link>
                                            <span className="text-danger">(5)</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="categories-bars-item d-flex justify-content-between">
                                            {/* Enlace para Comedia - ID 35 */}
                                            <Link to="/categorias/35/cine" className="text-dark text-decoration-none transition-hover">
                                                😂 Comedia
                                            </Link>
                                            <span className="text-danger">(2)</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="categories-bars-item d-flex justify-content-between">
                                            {/* Enlace para Terror - ID 27 */}
                                            <Link to="/categorias/27/cine" className="text-dark text-decoration-none transition-hover">
                                                😱 Terror
                                            </Link>
                                            <span className="text-danger">(8)</span>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="categories-bars-item d-flex justify-content-between">
                                            {/* Enlace para Drama - ID 18 */}
                                            <Link to="/categorias/18/cine" className="text-dark text-decoration-none transition-hover">
                                                🎭 Drama
                                            </Link>
                                            <span className="text-danger">(5)</span>
                                        </div>
                                    </li>

                                </ul>

                            </div>
                        </div>

                    </nav>
                </div>

                <div className="col-12 col-lg-9">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                        <a href="#" className="navbar-brand d-block d-lg-none">
                            <h1 className="display-6 text-danger m-0 fw-bold">
                                <i className="fas fa-film text-white me-2" />
                                MovieFlix
                            </h1>
                        </a>

                        <button
                            className="navbar-toggler ms-auto"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="fa fa-bars fa-1x text-white" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarCollapse">

                            <div className="navbar-nav ms-auto py-0 align-items-lg-center">

                                <Link to="/inicio" className="nav-link text-white fw-semibold px-3 transition-hover">
                                    <i className="fa fa-home me-2 text-danger"></i>
                                    Inicio
                                </Link>

                                <Link to="/tendencias/tendenciascine" className="nav-link text-white fw-semibold px-3 transition-hover">
                                    🔥 Tendencias
                                </Link>

                                <div className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle text-white fw-semibold px-3 transition-hover"
                                        data-bs-toggle="dropdown"
                                    >
                                        📺 Géneros TV
                                    </a>

                                    {/* 4. Animación al abrir el dropdown */}
                                    <div className="dropdown-menu shadow-lg border-0 animate__animated animate__fadeIn">
                                        <FiltroGenerosTv />
                                    </div>
                                </div>

                                <div className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle text-white fw-semibold px-3 transition-hover"
                                        data-bs-toggle="dropdown"
                                    >
                                        🎬 Géneros Cine
                                    </a>

                                    <div className="dropdown-menu shadow-lg border-0 animate__animated animate__fadeIn">
                                        <FiltroGenerosCine />
                                    </div>
                                </div>

                                <Link to="/actores" className="nav-link text-white fw-semibold px-3 transition-hover">
                                    <i className="fas fa-mask me-2"></i> Actores
                                </Link>

                                <div className="nav-item dropdown d-block d-lg-none mb-3">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle text-white transition-hover"
                                        data-bs-toggle="dropdown"
                                    >
                                        Categorías
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-dark m-0 animate__animated animate__fadeIn">

                                        <ul className="list-unstyled categories-bars text-white">

                                            <li>
                                                <div className="categories-bars-item">
                                                    <Link to="/categorias/28/cine" className="text-white text-decoration-none">Acción</Link>
                                                    <span>(3)</span>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="categories-bars-item">
                                                    <Link to="/categorias/878/cine" className="text-white text-decoration-none">Ciencia Ficción</Link>
                                                    <span>(5)</span>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="categories-bars-item">
                                                    <Link to="/categorias/35/cine" className="text-white text-decoration-none">Comedia</Link>
                                                    <span>(2)</span>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="categories-bars-item">
                                                    <Link to="/categorias/27/cine" className="text-white text-decoration-none">Terror</Link>
                                                    <span>(8)</span>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="categories-bars-item">
                                                    <Link to="/categorias/18/cine" className="text-white text-decoration-none">Drama</Link>
                                                    <span>(5)</span>
                                                </div>
                                            </li>

                                        </ul>

                                    </div>
                                </div>

                            </div>

                            <Link
                                to="/estrenos"
                                className="btn btn-danger rounded-pill py-2 px-4 ms-lg-4 fw-bold shadow transition-hover"
                            >
                                <i className="fa fa-play me-2"></i>
                                Ver Estrenos
                            </Link>

                        </div>

                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
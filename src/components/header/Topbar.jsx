import React from 'react'
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <div className="container-fluid px-5 d-none d-lg-block border-bottom border-danger bg-black">
            <div className="row gx-0 align-items-center text-white">

                <div className="col-lg-4 text-center text-lg-start mb-lg-0">
                    <div className="d-inline-flex align-items-center" style={{ height: 45 }}>

                        <Link to="/tendencias/recientes" className="text-dark me-2 text-decoration-none">
                            🎬 Estrenos
                        </Link>

                        <small className="text-danger"> / </small>

                        <Link to="/tendencias/mejorValoradasCine" className="text-dark mx-2 text-decoration-none">
                            ⭐ Populares
                        </Link>

                        <small className="text-danger"> / </small>

                        <Link to="/contact" className="text-dark ms-2 text-decoration-none">
                            📩 Contacto
                        </Link>

                    </div>
                </div>

                <div className="col-lg-4 text-center d-flex align-items-center justify-content-center">

                    <small className="text-danger fw-bold me-2">
                        <i className="fa fa-headset me-1"></i>
                        Soporte:
                    </small>

                    <a href="#" className="text-dark text-decoration-none">
                        (+012) 1234 567890
                    </a>

                </div>

                <div className="col-lg-4 text-center text-lg-end">

                    <div className="d-inline-flex align-items-center" style={{ height: 45 }}>

                        {/* MONEDA */}
                        <div className="dropdown">

                            <a href="#" className="dropdown-toggle text-light me-2 text-decoration-none text-dark" data-bs-toggle="dropdown">
                                <small>💰 USD</small>
                            </a>

                            <div className="dropdown-menu dropdown-menu-dark rounded shadow">

                                <a href="#" className="dropdown-item text-dark">
                                    💶 Euro
                                </a>

                                <a href="#" className="dropdown-item text-dark">
                                    💵 Dólar
                                </a>

                            </div>

                        </div>

                        {/* IDIOMA */}
                        <div className="dropdown">

                            <a href="#" className="dropdown-toggle text-light mx-2 text-decoration-none text-dark" data-bs-toggle="dropdown">
                                <small>🌎 Idioma</small>
                            </a>

                            <div className="dropdown-menu dropdown-menu-dark rounded shadow">

                                <a href="#" className="dropdown-item">
                                    🇺🇸 English
                                </a>

                                <a href="#" className="dropdown-item">
                                    🇪🇸 Español
                                </a>

                                <a href="#" className="dropdown-item">
                                    🇮🇹 Italiano
                                </a>

                                <a href="#" className="dropdown-item">
                                    🇹🇷 Turkish
                                </a>

                            </div>

                        </div>

                        {/* CUENTA */}
                        <div className="dropdown">

                            <a href="#" className="dropdown-toggle text-light ms-2 text-decoration-none text-dark" data-bs-toggle="dropdown">
                                <small>
                                    <i className="fa fa-user-circle me-2 text-danger"></i>
                                    Mi Cuenta
                                </small>
                            </a>

                            <div className="dropdown-menu dropdown-menu-dark rounded shadow">

                                <Link to="/error404" className="dropdown-item">
                                    🔐 Login
                                </Link>

                                <Link to="/error404" className="dropdown-item">
                                    ❤️ Favoritos
                                </Link>

                                <Link to="/error404" className="dropdown-item">
                                    🎟️ Mis Compras
                                </Link>

                                <Link to="/error404" className="dropdown-item">
                                    🔔 Notificaciones
                                </Link>

                                <Link to="/error404" className="dropdown-item">
                                    ⚙️ Configuración
                                </Link>

                                <Link to="/error404" className="dropdown-item">
                                    👤 Mi Perfil
                                </Link>

                                <Link to="/error404" className="dropdown-item text-danger">
                                    🚪 Cerrar sesión
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Topbar;
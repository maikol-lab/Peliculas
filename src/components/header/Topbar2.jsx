import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Topbar2 = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [categoriaBusqueda, setCategoriaBusqueda] = useState('All Category');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (terminoBusqueda.trim()) {
            navigate(`/busquedas?q=${encodeURIComponent(terminoBusqueda.trim())}`);
            setTerminoBusqueda('');
        }
    };

    const handleCategoriaChange = (e) => {
        const categoria = e.target.value;
        setCategoriaBusqueda(categoria);

        switch (categoria) {
            case 'Películas':
                navigate('/tendencias/tendenciascine');
                break;
            case 'Series':
                navigate('/tendencias/tendenciastv');
                break;
            case 'Personas':
                navigate('/actores');
                break;
            case 'All Category':
            default:
                navigate('/');
                break;
        }
    };

    return (
        <div className="container-fluid px-5 py-4 d-none d-lg-block bg-dark border-bottom border-secondary animate__animated animate__fadeIn topbar2-container" style={{ zIndex: 9998, position: 'relative', overflow: 'visible' }}>

            <div className="row gx-0 align-items-center text-center text-white" style={{ overflow: 'visible' }}>

                {/* LOGO */}
                <div className="col-md-4 col-lg-3 text-center text-lg-start" style={{ overflow: 'visible' }}>
                    <div className="d-inline-flex align-items-center" style={{ overflow: 'visible' }}>

                        <a href="/" className="navbar-brand p-0 text-decoration-none transition-hover">
                            <h1 className="display-6 text-white m-0 fw-bold">
                                <i className="fas fa-film text-danger me-2" />
                                MovieFlix
                            </h1>
                        </a>

                    </div>
                </div>

                {/* BUSCADOR */}
                <div className="col-md-4 col-lg-6 text-center" style={{ overflow: 'visible' }}>

                    <form onSubmit={handleSubmit}>

                        <div className="position-relative ps-4" style={{ overflow: 'visible' }}>

                            <div className="d-flex border border-secondary rounded-pill overflow-visible shadow">

                                <input
                                    className="form-control border-0 bg-black text-white w-100 py-3 transition-hover"
                                    type="text"
                                    placeholder="Buscar películas, series o actores..."
                                    value={terminoBusqueda}
                                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                                    style={{ overflow: 'visible' }}
                                />

                                <select
                                    className="form-select text-white bg-dark border-0 border-start border-secondary rounded-0 p-3 transition-hover"
                                    style={{ width: 200, overflow: 'visible', zIndex: 10001 }}
                                    value={categoriaBusqueda}
                                    onChange={handleCategoriaChange}
                                >
                                    <option value="All Category">🎬 Todo</option>
                                    <option value="Películas">🍿 Películas</option>
                                    <option value="Series">📺 Series</option>
                                    <option value="Personas">⭐ Actores</option>
                                </select>

                                <button
                                    type="submit"
                                    className="btn btn-secondary px-4 transition-hover"
                                    style={{
                                        border: 0,
                                        opacity: terminoBusqueda.trim() ? 1 : 0.6,
                                        zIndex: 10000
                                    }}
                                    disabled={!terminoBusqueda.trim()}
                                >
                                    <i className="fas fa-search" />
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

                {/* ICONOS - COLORES CORREGIDOS SEGÚN SPRITE.SVG */}
                <div className="col-md-4 col-lg-3 text-center text-lg-end" style={{ overflow: 'visible' }}>

                    <div className="d-inline-flex align-items-center" style={{ overflow: 'visible' }}>

                        {/* GitHub - Blanco */}
                        <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center justify-content-center me-3 transition-hover social-icon" style={{ color: 'white !important' }}>
                            <span className="rounded-circle btn-md-square border border-secondary d-flex align-items-center justify-content-center social-icon-box" style={{ overflow: 'visible', width: '40px', height: '40px' }}>
                                <svg width="20" height="20" viewBox="0 0 1024 1024" style={{ display: 'block' }}>
                                    <path fill="#fff" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" />
                                </svg>
                            </span>
                        </a>

                        {/* Instagram - Blanco */}
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center justify-content-center me-3 transition-hover social-icon" style={{ color: 'white !important' }}>
                            <span className="rounded-circle btn-md-square border border-secondary d-flex align-items-center justify-content-center social-icon-box" style={{ overflow: 'visible', width: '40px', height: '40px' }}>
                                <svg width="20" height="20" viewBox="0 0 256 256" style={{ display: 'block' }}>
                                    <path fill="#fff" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.289-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z" />
                                </svg>
                            </span>
                        </a>

                        {/* YouTube - Rojo con play blanco */}
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center justify-content-center me-3 transition-hover social-icon" style={{ color: 'white !important' }}>
                            <span className="rounded-circle btn-md-square border border-secondary d-flex align-items-center justify-content-center social-icon-box" style={{ overflow: 'visible', width: '40px', height: '40px' }}>
                                <svg width="20" height="20" viewBox="0 0 256 180" style={{ display: 'block' }}>
                                    <path fill="#FF0000" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" />
                                    <path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
                                </svg>
                            </span>
                        </a>

                        {/* X (Twitter) - Blanco */}
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center justify-content-center me-3 transition-hover social-icon" style={{ color: 'white !important' }}>
                            <span className="rounded-circle btn-md-square border border-secondary d-flex align-items-center justify-content-center social-icon-box" style={{ overflow: 'visible', width: '40px', height: '40px' }}>
                                <svg width="20" height="20" viewBox="0 0 1200 1227" style={{ display: 'block' }}>
                                    <path fill="#fff" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
                                </svg>
                            </span>
                        </a>

                        {/* LinkedIn - Azul oficial #0A66C2 */}
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center justify-content-center me-3 transition-hover social-icon" style={{ color: 'white !important' }}>
                            <span className="rounded-circle btn-md-square border border-secondary d-flex align-items-center justify-content-center social-icon-box" style={{ overflow: 'visible', width: '40px', height: '40px' }}>
                                <svg width="20" height="20" viewBox="0 0 256 256" style={{ display: 'block' }}>
                                    <path fill="#0A66C2" d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
                                </svg>
                            </span>
                        </a>

                        {/* Twitch - Blanco con ojos púrpura #9146ff */}
                        <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer" className="text-white d-flex align-items-center justify-content-center me-3 transition-hover social-icon" style={{ color: 'white !important' }}>
                            <span className="rounded-circle btn-md-square border border-secondary d-flex align-items-center justify-content-center social-icon-box" style={{ overflow: 'visible', width: '40px', height: '40px' }}>
                                <svg width="20" height="20" viewBox="0 0 2400 2800" style={{ display: 'block' }}>
                                    <path fill="#fff" d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z" />
                                    <g fill="#9146ff">
                                        <path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" />
                                        <path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" />
                                    </g>
                                </svg>
                            </span>
                        </a>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Topbar2;
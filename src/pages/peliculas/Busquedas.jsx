import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Busquedas = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [totalResultados, setTotalResultados] = useState(0);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const txtBuscar = searchParams.get('q') || '';

    const API_KEY = 'ecbcdcf9044928d12b179d9153f5a269';
    const rutaImagen = "https://image.tmdb.org/t/p/w500";
    const rutaDetalle = "/detalle/";

    const buscarMulti = async (pagina = 1) => {
        if (!txtBuscar.trim()) return;

        setCargando(true);
        try {
            const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(txtBuscar)}&language=es-VE&page=${pagina}&include_adult=false`;
            const response = await fetch(url);
            const data = await response.json();

            // Filtrar resultados que tengan imagen
            const resultadosConImagen = (data.results || []).filter(item =>
                (item.media_type !== 'person' && item.poster_path) ||
                (item.media_type === 'person' && item.profile_path)
            );

            setResultados(resultadosConImagen);
            setTotalResultados(resultadosConImagen.length);
            setTotalPaginas(data.total_pages || 1);
            setPaginaActual(data.page || 1);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setResultados([]);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (txtBuscar) {
            buscarMulti(1);
        } else {
            setResultados([]);
            setTotalResultados(0);
        }
    }, [txtBuscar]);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            buscarMulti(nuevaPagina);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const obtenerTipo = (item) => {
        return item.media_type === 'tv' ? 'tv' : 'cine';
    };

    const obtenerTitulo = (item) => {
        return item.title || item.name || 'Título no disponible';
    };

    const obtenerFecha = (item) => {
        return item.release_date || item.first_air_date || null;
    };

    const obtenerAnio = (item) => {
        const fecha = obtenerFecha(item);
        return fecha ? fecha.split('-')[0] : 'Año N/A';
    };

    // Función para obtener las películas conocidas de un actor
    const obtenerPeliculasConocidas = (item) => {
        if (item.media_type === 'person' && item.known_for && item.known_for.length > 0) {
            return item.known_for
                .filter(pelicula => pelicula.poster_path) // Solo películas con imagen
                .map(pelicula => pelicula.title || pelicula.name);
        }
        return [];
    };

    const renderResultados = () => {
        if (!txtBuscar) {
            return (
                <div className="text-center py-5">
                    <div className="display-1 mb-4">🔍</div>
                    <h3 className="text-white">Busca películas, series o personas</h3>
                    <p className="text-white-50">Escribe en el campo de búsqueda para comenzar</p>
                </div>
            );
        }

        if (cargando) {
            return (
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="text-white mt-3">Buscando "{txtBuscar}"...</p>
                </div>
            );
        }

        if (resultados.length === 0) {
            return (
                <div className="text-center py-5">
                    <div className="display-1 mb-4">😕</div>
                    <h3 className="text-white">No se encontraron resultados con imágenes</h3>
                    <p className="text-white-50">Para: "{txtBuscar}"</p>
                    <p className="text-white-50 mt-3">Prueba con otros términos de búsqueda</p>
                </div>
            );
        }

        return (
            <>
                <div className="row">
                    {resultados.map((item) => {
                        const tipo = obtenerTipo(item);
                        const titulo = obtenerTitulo(item);
                        const anio = obtenerAnio(item);
                        const imagen = item.poster_path || item.profile_path;
                        const peliculasConocidas = obtenerPeliculasConocidas(item);

                        return (
                            <div className="col-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                                <div
                                    className="card h-100"
                                    style={{
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.5)';
                                        e.currentTarget.style.borderColor = '#28a745';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                    }}
                                >
                                    <div className="position-relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                                        <img
                                            src={rutaImagen + imagen}
                                            className="img-fluid w-100 h-100"
                                            alt={titulo}
                                            style={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                // Si hay error, ocultamos este elemento
                                                e.target.parentElement.parentElement.parentElement.style.display = 'none';
                                            }}
                                        />

                                        {/* Badge de tipo */}
                                        <div className="position-absolute top-0 start-0 m-2">
                                            <span className={`badge ${item.media_type === 'tv' ? 'bg-info' : item.media_type === 'person' ? 'bg-secondary' : 'bg-success'} rounded-pill px-2 py-1`}>
                                                {item.media_type === 'tv' ? '📺 TV' : item.media_type === 'person' ? '👤 Persona' : '🎬 Cine'}
                                            </span>
                                        </div>

                                        {/* Badge de popularidad */}
                                        {item.popularity > 0 && (
                                            <div className="position-absolute top-0 end-0 m-2">
                                                <span className="badge bg-danger rounded-pill px-2 py-1">
                                                    🔥 {parseInt(item.popularity)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="card-body text-center p-2">
                                        <h6 className="fw-bold mb-1 text-white" style={{
                                            fontSize: '0.9rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: '2.5rem'
                                        }}>
                                            {titulo}
                                        </h6>

                                        {/* Mostrar año para películas/series o departamento para actores */}
                                        <p className="small text-white-50 mb-2">
                                            {item.media_type === 'person' ?
                                                (item.known_for_department || 'Artista') :
                                                anio
                                            }
                                        </p>

                                        {/* Mostrar películas conocidas para actores (solo con imagen) */}
                                        {item.media_type === 'person' && peliculasConocidas.length > 0 && (
                                            <div className="mt-2">
                                                <p className="small text-warning mb-1">
                                                    <span role="img" aria-label="estrella">⭐</span> Conocido por:
                                                </p>
                                                <div className="d-flex flex-wrap gap-1 justify-content-center">
                                                    {peliculasConocidas.slice(0, 3).map((pelicula, index) => (
                                                        <span key={index} className="badge bg-dark text-white-50 border border-secondary small"
                                                            style={{ fontSize: '0.7rem', padding: '4px 8px' }}>
                                                            {pelicula.length > 18 ? pelicula.substring(0, 18) + '...' : pelicula}
                                                        </span>
                                                    ))}
                                                </div>
                                                {peliculasConocidas.length > 3 && (
                                                    <small className="text-white-50 d-block mt-1">
                                                        +{peliculasConocidas.length - 3} más
                                                    </small>
                                                )}
                                            </div>
                                        )}

                                        {/* Mostrar calificación para películas/series */}
                                        {item.media_type !== 'person' && item.vote_average > 0 && (
                                            <div className="mt-2">
                                                <span className="badge bg-warning text-dark rounded-pill px-2 py-1">
                                                    ⭐ {item.vote_average.toFixed(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="card-footer text-center bg-transparent border-0 pb-3">
                                        <div className="d-flex gap-2">
                                            {/* Botón de acción según el tipo */}
                                            {item.media_type === 'person' ? (
                                                <Link
                                                    to={`/actores/${item.id}`}
                                                    className="btn btn-warning btn-sm w-100"
                                                    style={{
                                                        borderRadius: '20px',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.transform = 'translateY(-2px)';
                                                        e.target.style.boxShadow = '0 5px 10px rgba(255, 193, 7, 0.3)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.transform = 'translateY(0)';
                                                        e.target.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                        <circle cx="12" cy="7" r="4" />
                                                    </svg>
                                                    Ver perfil
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={rutaDetalle + tipo + '/' + item.id}
                                                    className="btn btn-success btn-sm w-100"
                                                    style={{
                                                        borderRadius: '20px',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.transform = 'translateY(-2px)';
                                                        e.target.style.boxShadow = '0 5px 10px rgba(40, 167, 69, 0.3)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.transform = 'translateY(0)';
                                                        e.target.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="12" y1="16" x2="12" y2="12" />
                                                        <circle cx="12" cy="8" r="1" fill="currentColor" />
                                                    </svg>
                                                    Detalle
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Paginación */}
                {totalPaginas > 1 && (
                    <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
                        <button
                            className="btn btn-outline-success"
                            onClick={() => cambiarPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}
                        >
                            ← Anterior
                        </button>

                        <span className="text-white">
                            Página {paginaActual} de {totalPaginas}
                        </span>

                        <button
                            className="btn btn-outline-success"
                            onClick={() => cambiarPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                        >
                            Siguiente →
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="container-fluid bg-dark text-secondary py-4 min-vh-100">
            <div className="container">
                {/* Barra de búsqueda */}
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 col-lg-6">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-white border-secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </span>

                            <input
                                type="text"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="Buscar películas, series o personas..."
                                value={txtBuscar}
                                onChange={(e) => setSearchParams({ q: e.target.value })}
                                style={{ fontSize: '1.1rem', padding: '12px' }}
                            />

                            {txtBuscar && (
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => setSearchParams({})}
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {txtBuscar && (
                            <div className="text-white-50 text-center mt-2">
                                {totalResultados > 0 ? (
                                    <span>Se encontraron <b>{totalResultados}</b> resultados con imágenes</span>
                                ) : (
                                    <span>No hay resultados con imágenes para mostrar</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Resultados */}
                {renderResultados()}
            </div>
        </div>
    );
};

export default Busquedas;
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Actores = () => {
    const { id } = useParams();

    // Si hay ID, mostrar detalle del actor
    if (id) {
        return <DetalleActor actorId={id} />;
    }

    // Si no hay ID, mostrar lista de actores populares
    return <ListaActoresPopulares />;
};

// Componente para la lista de actores populares
const ListaActoresPopulares = () => {
    const [actores, setActores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const API_KEY = 'ecbcdcf9044928d12b179d9153f5a269';
    const rutaImagen = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        const obtenerActoresPopulares = async () => {
            setCargando(true);
            try {
                const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=es-ES&page=${pagina}`;
                const response = await fetch(url);
                const data = await response.json();

                // Filtrar actores que tengan imagen
                const actoresConImagen = (data.results || []).filter(actor => actor.profile_path);

                setActores(actoresConImagen);
                setTotalPaginas(data.total_pages || 1);
            } catch (error) {
                console.error("Error al cargar actores populares:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerActoresPopulares();
    }, [pagina]);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPagina(nuevaPagina);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (cargando) {
        return (
            <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="text-white mt-3">Cargando actores populares...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-dark text-secondary py-5 min-vh-100">
            <div className="container">
                <h1 className="text-white text-center mb-5">
                    <span className="text-warning me-2">
                        <i className="fas fa-users"></i>
                        <i className="fas fa-star ms-1" style={{ fontSize: '0.7em', position: 'relative', top: '-8px' }}></i>
                    </span> Actores Populares
                </h1>

                <div className="row">
                    {actores.map((actor) => (
                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4" key={actor.id}>
                            <Link to={`/actores/${actor.id}`} style={{ textDecoration: 'none' }}>
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
                                            src={rutaImagen + actor.profile_path}
                                            className="img-fluid w-100 h-100"
                                            alt={actor.name}
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
                                        />

                                        {/* Badge de popularidad */}
                                        {actor.popularity > 0 && (
                                            <div className="position-absolute top-0 end-0 m-2">
                                                <span className="badge bg-danger rounded-pill px-2 py-1">
                                                    🔥 {parseInt(actor.popularity)}
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
                                            {actor.name}
                                        </h6>
                                        <p className="small text-white-50 mb-2">
                                            {actor.known_for_department || 'Actor/Actriz'}
                                        </p>

                                        {/* Películas conocidas */}
                                        {actor.known_for && actor.known_for.length > 0 && (
                                            <div className="mt-2">
                                                <p className="small text-warning mb-1">
                                                    <span role="img" aria-label="estrella">⭐</span> Conocido por:
                                                </p>
                                                <div className="d-flex flex-wrap gap-1 justify-content-center">
                                                    {actor.known_for.slice(0, 2).map((item, index) => (
                                                        <span key={index} className="badge bg-dark text-white-50 border border-secondary small"
                                                            style={{ fontSize: '0.7rem', padding: '4px 8px' }}>
                                                            {item.title || item.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="card-footer text-center bg-transparent border-0 pb-3">
                                        <span className="btn btn-warning btn-sm w-100" style={{ borderRadius: '20px' }}>
                                            Ver perfil
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
                {totalPaginas > 1 && (
                    <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
                        <button
                            className="btn btn-outline-success"
                            onClick={() => cambiarPagina(pagina - 1)}
                            disabled={pagina === 1}
                        >
                            ← Anterior
                        </button>

                        <span className="text-white">
                            Página {pagina} de {totalPaginas}
                        </span>

                        <button
                            className="btn btn-outline-success"
                            onClick={() => cambiarPagina(pagina + 1)}
                            disabled={pagina === totalPaginas}
                        >
                            Siguiente →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente para el detalle del actor (tu código original adaptado)
const DetalleActor = ({ actorId }) => {
    const [actor, setActor] = useState(null);
    const [creditos, setCreditos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('todas');

    const API_KEY = 'ecbcdcf9044928d12b179d9153f5a269';
    const rutaImagen = "https://image.tmdb.org/t/p/w500";
    const rutaDetalle = "/detalle/";

    useEffect(() => {
        const obtenerDatosActor = async () => {
            try {
                setCargando(true);

                const actorUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=es-ES`;
                const actorRes = await fetch(actorUrl);
                const actorData = await actorRes.json();

                if (!actorData.profile_path) {
                    setError("Este actor no tiene imagen disponible");
                    setCargando(false);
                    return;
                }

                const creditosUrl = `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}&language=es-ES`;
                const creditosRes = await fetch(creditosUrl);
                const creditosData = await creditosRes.json();

                setActor(actorData);

                const todosCreditos = [...(creditosData.cast || []), ...(creditosData.crew || [])];
                const creditosConImagen = todosCreditos.filter(item => item.poster_path);
                const creditosUnicos = Array.from(new Map(creditosConImagen.map(item => [item.id, item])).values());
                const creditosOrdenados = creditosUnicos.sort((a, b) => {
                    const fechaA = a.release_date || a.first_air_date || '1900-01-01';
                    const fechaB = b.release_date || b.first_air_date || '1900-01-01';
                    return fechaB.localeCompare(fechaA);
                });

                setCreditos(creditosOrdenados);
                setCargando(false);
            } catch (err) {
                console.error("Error al cargar actor:", err);
                setError("No se pudo cargar la información del actor");
                setCargando(false);
            }
        };

        obtenerDatosActor();
    }, [actorId]);

    const filtrarCreditos = () => {
        if (filtro === 'peliculas') {
            return creditos.filter(item => item.media_type === 'movie');
        } else if (filtro === 'series') {
            return creditos.filter(item => item.media_type === 'tv');
        }
        return creditos;
    };

    const creditosFiltrados = filtrarCreditos();

    const formatFecha = (fecha) => {
        if (!fecha) return 'Fecha desconocida';
        return new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (cargando) {
        return (
            <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="text-white mt-3">Cargando información del actor...</p>
                </div>
            </div>
        );
    }

    if (error || !actor) {
        return (
            <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="display-1 mb-4">😕</div>
                    <h3 className="text-white">Error al cargar el perfil</h3>
                    <p className="text-white-50">{error || "No se encontró el actor"}</p>
                    <Link to="/actores" className="btn btn-success mt-3">Ver todos los actores</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-dark text-secondary py-5 min-vh-100">
            <div className="container">
                {/* Botón para volver a la lista */}
                <div className="mb-4">
                    <Link to="/actores" className="btn btn-outline-success">
                        ← Volver a actores populares
                    </Link>
                </div>

                {/* Cabecera con información del actor (tu código original) */}
                <div className="row mb-5">
                    <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                        <div className="position-relative">
                            <img
                                src={rutaImagen + actor.profile_path}
                                alt={actor.name}
                                className="img-fluid rounded-3 w-100"
                                style={{
                                    boxShadow: '0 20px 30px rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            />

                            {actor.popularity && (
                                <div className="position-absolute top-0 end-0 m-3">
                                    <span className="badge bg-danger rounded-pill px-3 py-2">
                                        🔥 Popularidad: {parseInt(actor.popularity)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-8 col-lg-9">
                        <h1 className="display-4 text-white mb-3">{actor.name}</h1>

                        {actor.also_known_as?.length > 0 && (
                            <p className="text-white-50 mb-2">
                                <span className="text-warning">También conocido como:</span> {actor.also_known_as.join(', ')}
                            </p>
                        )}

                        <div className="row mb-4">
                            <div className="col-sm-6 col-md-4 mb-2">
                                <div className="bg-dark-50 p-3 rounded-3 border border-secondary">
                                    <small className="text-warning d-block">Fecha de nacimiento</small>
                                    <span className="text-white">{formatFecha(actor.birthday)}</span>
                                </div>
                            </div>

                            {actor.deathday && (
                                <div className="col-sm-6 col-md-4 mb-2">
                                    <div className="bg-dark-50 p-3 rounded-3 border border-secondary">
                                        <small className="text-warning d-block">Fecha de fallecimiento</small>
                                        <span className="text-white">{formatFecha(actor.deathday)}</span>
                                    </div>
                                </div>
                            )}

                            {actor.place_of_birth && (
                                <div className="col-sm-6 col-md-4 mb-2">
                                    <div className="bg-dark-50 p-3 rounded-3 border border-secondary">
                                        <small className="text-warning d-block">Lugar de nacimiento</small>
                                        <span className="text-white">{actor.place_of_birth}</span>
                                    </div>
                                </div>
                            )}

                            {actor.known_for_department && (
                                <div className="col-sm-6 col-md-4 mb-2">
                                    <div className="bg-dark-50 p-3 rounded-3 border border-secondary">
                                        <small className="text-warning d-block">Departamento</small>
                                        <span className="text-white">{actor.known_for_department}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {actor.biography && (
                            <div className="mb-4">
                                <h5 className="text-warning mb-3">Biografía</h5>
                                <p className="text-white-50" style={{ lineHeight: 1.8 }}>
                                    {actor.biography}
                                </p>
                            </div>
                        )}

                        {actor.homepage && (
                            <a
                                href={actor.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-success me-2"
                            >
                                <i className="fas fa-globe me-2"></i>Sitio web oficial
                            </a>
                        )}

                        {actor.imdb_id && (
                            <a
                                href={`https://www.imdb.com/name/${actor.imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-warning"
                            >
                                <i className="fab fa-imdb me-2"></i>IMDb
                            </a>
                        )}
                    </div>
                </div>

                {/* Sección de películas y series (tu código original) */}
                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-white mb-0">
                            <i className="fas fa-film me-2 text-warning"></i>
                            Filmografía ({creditosFiltrados.length})
                        </h3>

                        <div className="btn-group">
                            <button
                                className={`btn btn-sm ${filtro === 'todas' ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => setFiltro('todas')}
                            >
                                Todas
                            </button>
                            <button
                                className={`btn btn-sm ${filtro === 'peliculas' ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => setFiltro('peliculas')}
                            >
                                Películas
                            </button>
                            <button
                                className={`btn btn-sm ${filtro === 'series' ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => setFiltro('series')}
                            >
                                Series
                            </button>
                        </div>
                    </div>

                    {creditosFiltrados.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-white-50">No hay {filtro === 'peliculas' ? 'películas' : filtro === 'series' ? 'series' : 'trabajos'} con imágenes disponibles</p>
                        </div>
                    ) : (
                        <div className="row">
                            {creditosFiltrados.map((item) => {
                                const titulo = item.title || item.name;
                                const fecha = item.release_date || item.first_air_date;
                                const anio = fecha ? new Date(fecha).getFullYear() : 'Año N/A';
                                const personaje = item.character || item.job || 'Rol desconocido';
                                const tipo = item.media_type === 'tv' ? 'tv' : 'cine';

                                return (
                                    <div className="col-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                                        <Link
                                            to={rutaDetalle + tipo + '/' + item.id}
                                            style={{ textDecoration: 'none' }}
                                        >
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
                                                        src={rutaImagen + item.poster_path}
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
                                                            e.target.parentElement.parentElement.parentElement.style.display = 'none';
                                                        }}
                                                    />

                                                    <div className="position-absolute top-0 start-0 m-2">
                                                        <span className={`badge ${item.media_type === 'tv' ? 'bg-info' : 'bg-success'} rounded-pill px-2 py-1`}>
                                                            {item.media_type === 'tv' ? '📺 TV' : '🎬 Cine'}
                                                        </span>
                                                    </div>

                                                    {item.popularity && (
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
                                                    <p className="small text-white-50 mb-1">{anio}</p>
                                                    <p className="small text-warning mb-0" style={{
                                                        fontSize: '0.75rem',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}>
                                                        {personaje}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Actores;
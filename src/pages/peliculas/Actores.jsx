import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// === CONSTANTES GLOBALES ===
const API_KEY = 'ecbcdcf9044928d12b179d9153f5a269';
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const CARD_STYLES = {
    base: { transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', borderRadius: '12px', overflow: 'hidden', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', border: '1px solid rgba(255,255,255,0.1)' },
    hover: { transform: 'translateY(-10px) scale(1.02)', boxShadow: '0 20px 30px rgba(0,0,0,0.5)', borderColor: '#28a745' }
};

// === COMPONENTES REUTILIZABLES ===
const Loading = ({ msg }) => (
    <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
            <div className="spinner-border text-success" style={{ width: '3rem', height: '3rem' }} />
            <p className="text-white mt-3">{msg}</p>
        </div>
    </div>
);

const ErrorState = ({ msg, backTo }) => (
    <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center text-center">
        <div>
            <div className="display-1 mb-4">😕</div>
            <h3 className="text-white">Error al cargar</h3>
            <p className="text-white-50">{msg}</p>
            {backTo && <Link to={backTo} className="btn btn-success mt-3">Volver</Link>}
        </div>
    </div>
);

const Card = ({ content, type }) => {
    const [hover, setHover] = useState(false);
    const isActor = type === 'actor';
    const title = isActor ? content.name : (content.title || content.name);
    const img = isActor ? content.profile_path : content.poster_path;
    const badge = isActor
        ? { text: `🔥 ${parseInt(content.popularity)}`, bg: 'bg-danger' }
        : { text: content.media_type === 'tv' ? '📺 TV' : '🎬 Cine', bg: content.media_type === 'tv' ? 'bg-info' : 'bg-success' };

    return (
        <div className="card h-100" style={{ ...CARD_STYLES.base, ...(hover ? CARD_STYLES.hover : {}) }}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="position-relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                <img src={IMG_URL + img} className="img-fluid w-100 h-100" alt={title}
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease', transform: hover ? 'scale(1.1)' : 'scale(1)' }} />
                <div className="position-absolute top-0 end-0 m-2">
                    <span className={`badge ${badge.bg} rounded-pill px-2 py-1`}>{badge.text}</span>
                </div>
            </div>
            <div className="card-body text-center p-2">
                <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.5rem' }}>{title}</h6>
                {isActor && <p className="small text-white-50 mb-2">{content.known_for_department || 'Actor/Actriz'}</p>}
                {!isActor && (<>
                    <p className="small text-white-50 mb-1">{content.release_date || content.first_air_date ? new Date(content.release_date || content.first_air_date).getFullYear() : 'N/A'}</p>
                    <p className="small text-warning mb-0" style={{ fontSize: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{content.character || content.job || 'Rol desconocido'}</p>
                </>)}
                {isActor && content.known_for?.length > 0 && (
                    <div className="mt-2 d-flex flex-wrap gap-1 justify-content-center">
                        {content.known_for.slice(0, 2).map((item, i) => (
                            <span key={i} className="badge bg-dark text-white-50 border border-secondary small" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>{item.title || item.name}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="card-footer text-center bg-transparent border-0 pb-3">
                <span className="btn btn-warning btn-sm w-100" style={{ borderRadius: '20px' }}>{isActor ? 'Ver perfil' : 'Ver detalle'}</span>
            </div>
        </div>
    );
};

const ActorCard = ({ actor, href }) => (
    <Link to={href} style={{ textDecoration: 'none' }}><Card content={actor} type="actor" /></Link>
);

const CreditCard = ({ item }) => (
    <Link to={`/detalle/${item.media_type === 'tv' ? 'tv' : 'cine'}/${item.id}`} style={{ textDecoration: 'none' }}><Card content={item} type="credit" /></Link>
);

// === COMPONENTE PRINCIPAL ===
const Actores = () => {
    const { id } = useParams();
    return id ? <DetalleActor actorId={id} /> : <ListaActoresPopulares />;
};

// === LISTA DE ACTORES ===
const ListaActoresPopulares = () => {
    const [actores, setActores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        const fetchActores = async () => {
            setCargando(true);
            try {
                const res = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=es-ES&page=${pagina}`);
                const data = await res.json();
                setActores((data.results || []).filter(a => a.profile_path));
                setTotalPaginas(data.total_pages || 1);
            } catch (e) { console.error(e); }
            finally { setCargando(false); }
        };
        fetchActores();
    }, [pagina]);

    if (cargando) return <Loading msg="Cargando actores populares..." />;

    return (
        <div className="container-fluid bg-dark text-secondary py-5 min-vh-100">
            <div className="container">
                <h1 className="text-white text-center mb-5">
                    <span className="text-warning me-2"><i className="fas fa-users"></i><i className="fas fa-star ms-1" style={{ fontSize: '0.7em', top: '-8px', position: 'relative' }}></i></span>
                    Actores Populares
                </h1>
                <div className="row">
                    {actores.map(actor => (
                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4" key={actor.id}>
                            <ActorCard actor={actor} href={`/actores/${actor.id}`} />
                        </div>
                    ))}
                </div>
                {totalPaginas > 1 && (
                    <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
                        <button className="btn btn-outline-success" onClick={() => setPagina(p => p - 1)} disabled={pagina === 1}>← Anterior</button>
                        <span className="text-white">Página {pagina} de {totalPaginas}</span>
                        <button className="btn btn-outline-success" onClick={() => setPagina(p => p + 1)} disabled={pagina === totalPaginas}>Siguiente →</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// === DETALLE DEL ACTOR ===
const DetalleActor = ({ actorId }) => {
    const [actor, setActor] = useState(null);
    const [creditos, setCreditos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const [actorRes, creditosRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=es-ES`),
                    fetch(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${API_KEY}&language=es-ES`)
                ]);
                const actorData = await actorRes.json();
                const creditosData = await creditosRes.json();

                if (!actorData.profile_path) { setError("Sin imagen disponible"); setCargando(false); return; }

                const todos = [...(creditosData.cast || []), ...(creditosData.crew || [])];
                const conImg = todos.filter(i => i.poster_path);
                const unicos = Array.from(new Map(conImg.map(i => [i.id, i])).values());
                setCreditos(unicos.sort((a, b) => (b.release_date || b.first_air_date || '').localeCompare(a.release_date || a.first_air_date || '')));
                setActor(actorData);
            } catch (e) { setError("No se pudo cargar"); console.error(e); }
            finally { setCargando(false); }
        };
        fetchActor();
    }, [actorId]);

    const creditosFiltrados = filtro === 'peliculas' ? creditos.filter(i => i.media_type === 'movie') : filtro === 'series' ? creditos.filter(i => i.media_type === 'tv') : creditos;
    const formatFecha = (f) => f ? new Date(f).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Desconocida';

    if (cargando) return <Loading msg="Cargando información del actor..." />;
    if (error || !actor) return <ErrorState msg={error || "Actor no encontrado"} backTo="/actores" />;

    return (
        <div className="container-fluid bg-dark text-secondary py-5 min-vh-100">
            <div className="container">
                <Link to="/actores" className="btn btn-outline-success mb-4">← Volver a actores</Link>

                <div className="row mb-5">
                    <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                        <div className="position-relative">
                            <img src={IMG_URL + actor.profile_path} alt={actor.name} className="img-fluid rounded-3 w-100" style={{ boxShadow: '0 20px 30px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }} />
                            {actor.popularity && <div className="position-absolute top-0 end-0 m-3"><span className="badge bg-danger rounded-pill px-3 py-2">🔥 {parseInt(actor.popularity)}</span></div>}
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <h1 className="display-4 text-white mb-3">{actor.name}</h1>
                        {actor.also_known_as?.length > 0 && <p className="text-white-50 mb-2"><span className="text-warning">También conocido como:</span> {actor.also_known_as.join(', ')}</p>}

                        <div className="row mb-4">
                            {[['Fecha de nacimiento', actor.birthday], ['Fecha de fallecimiento', actor.deathday], ['Lugar de nacimiento', actor.place_of_birth], ['Departamento', actor.known_for_department]]
                                .filter(([, v]) => v)
                                .map(([label, value], i) => (
                                    <div className="col-sm-6 col-md-4 mb-2" key={i}>
                                        <div className="bg-dark-50 p-3 rounded-3 border border-secondary">
                                            <small className="text-warning d-block">{label}</small>
                                            <span className="text-white">{label.includes('Fecha') ? formatFecha(value) : value}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {actor.biography && <div className="mb-4"><h5 className="text-warning mb-3">Biografía</h5><p className="text-white-50" style={{ lineHeight: 1.8 }}>{actor.biography}</p></div>}

                        <div className="d-flex gap-2">
                            {actor.homepage && <a href={actor.homepage} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success"><i className="fas fa-globe me-2"></i>Sitio web</a>}
                            {actor.imdb_id && <a href={`https://www.imdb.com/name/${actor.imdb_id}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning"><i className="fab fa-imdb me-2"></i>IMDb</a>}
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="text-white mb-0"><i className="fas fa-film me-2 text-warning"></i>Filmografía ({creditosFiltrados.length})</h3>
                        <div className="btn-group">
                            {['todas', 'peliculas', 'series'].map(f => (
                                <button key={f} className={`btn btn-sm ${filtro === f ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFiltro(f)}>
                                    {f === 'todas' ? 'Todas' : f === 'peliculas' ? 'Películas' : 'Series'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {creditosFiltrados.length === 0 ? (
                        <div className="text-center py-5"><p className="text-white-50">No hay trabajos con imágenes disponibles</p></div>
                    ) : (
                        <div className="row">
                            {creditosFiltrados.map(item => (
                                <div className="col-6 col-md-4 col-lg-3 mb-4" key={item.id}><CreditCard item={item} /></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Actores;
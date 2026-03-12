import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";

// === CONSTANTES ===
const API_KEY = 'ecbcdcf9044928d12b179d9153f5a269';
const IMG_URL = "https://image.tmdb.org/t/p/original/";
const LANGUAGES = [
    { code: 'es-MX', flag: '🇲🇽', label: 'Español México' },
    { code: 'es', flag: '🇪🇸', label: 'Español España' },
    { code: 'en', flag: '🇬🇧', label: 'English' }
];
const LATAM_COUNTRIES = ['MX', 'CO', 'AR', 'CL', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'CR', 'SV', 'GT', 'HN', 'NI', 'PA', 'DO', 'PR'];
const DEFAULT_TRAILERS = { 'es-MX': 'g4Hbz2jLxvQ', 'es': 'hIR8Ar-ZZ1A', 'en': '6ZfuNTqbHE8' };

// === COMPONENTES REUTILIZABLES ===
const PersonCard = ({ person, type, ruta }) => {
    if (!person?.profile_path) return null;
    const isCast = type === 'cast';
    return (
        <div className={`col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 ${isCast ? 'animate__animated animate__fadeInUp' : 'animate__animated animate__zoomIn'}`}>
            <div className={`card ${isCast ? 'resaltar text-center' : 'bg-dark text-white border-0'} h-100 transition-hover`}>
                <img src={IMG_URL + person.profile_path} className={`${isCast ? 'card-img-top' : 'card-img-top rounded-3'}`}
                    alt={person.name} style={!isCast ? { height: '200px', objectFit: 'cover' } : {}} />
                <div className={isCast ? '' : 'card-body text-center p-2'}>
                    <p className="small mb-1">{person.name}</p>
                    {isCast && <span className="small text-black d-block">{person.character}</span>}
                    {!isCast && <p className="card-text small text-warning mb-0">{person.job || 'Sin rol'}</p>}
                    {isCast && <span className="small text-dark"><b>Popularidad: {person.popularity?.toFixed(1) || 'N/A'}</b></span>}
                </div>
                {isCast && (
                    <div className="card-footer">
                        <Link to={`/actores/${person.id}/peliculas`} className="btn btn-danger btn-sm w-100">Películas</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const LanguageButton = ({ lang, selected, onClick }) => (
    <button
        style={{
            padding: '8px 16px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: selected ? 'bold' : 500,
            cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px',
            backgroundColor: selected ? '#28a745' : 'rgba(255,255,255,0.1)',
            border: selected ? '2px solid #28a745' : '1px solid #404040',
            transform: selected ? 'scale(1.05)' : 'scale(1)',
            boxShadow: selected ? '0 0 15px rgba(40,167,69,0.5)' : 'none'
        }}
        onClick={onClick}
    >
        <span>{lang.flag}</span>{lang.label}{selected && <span style={{ color: '#28a745' }}>✓</span>}
    </button>
);

const ModalTrailer = ({ playtrailer, trailerkey, selectedLanguage, setSelectedLanguage, onClose, videoCount }) => {
    if (!playtrailer || !trailerkey) return null;

    const getYouTubeLanguage = () => selectedLanguage === 'es-MX' ? 'es-MX' : selectedLanguage === 'es' ? 'es' : 'en';

    return (
        <div style={modalStyles.overlay} onClick={onClose}>
            <div style={modalStyles.container} onClick={(e) => e.stopPropagation()}>
                <div style={modalStyles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <h3 style={modalStyles.title}>Trailer</h3>
                        <div style={modalStyles.languageSelector}>
                            {LANGUAGES.map(lang => (
                                <LanguageButton key={lang.code} lang={lang} selected={selectedLanguage === lang.code}
                                    onClick={() => setSelectedLanguage(lang.code)} />
                            ))}
                        </div>
                    </div>
                    <button style={modalStyles.closeButton} onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div style={modalStyles.content}>
                    <YouTube videoId={trailerkey} opts={{
                        width: "100%", height: "100%",
                        playerVars: {
                            autoplay: 1, modestbranding: 1, rel: 0, cc_load_policy: 1,
                            hl: getYouTubeLanguage(), cc_lang_pref: getYouTubeLanguage(), iv_load_policy: 3, persist_hl: 1
                        }
                    }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        onReady={(event) => {
                            try { event.target.setOption('captions', 'track', { 'languageCode': getYouTubeLanguage() }); }
                            catch (e) { console.log('No se pudo configurar subtítulos'); }
                        }} />
                </div>
                <div style={modalStyles.footer}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {videoCount === 0 && <span style={{ color: '#ffc107', fontSize: '0.85rem' }}>⚡ Mostrando video promocional</span>}
                        <button style={modalStyles.footerButton} onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// === COMPONENTE PRINCIPAL ===
const Detalle = () => {
    const { tipo, id } = useParams();
    const [datos, setDatos] = useState({});
    const [datareparto, setDatareparto] = useState([]);
    const [dataproduccion, setdProduccion] = useState([]);
    const [datavideo, setDatavideo] = useState([]);
    const [playtrailer, setPlaytrailer] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('es-MX');

    // === FETCH PARALELO ===
    useEffect(() => {
        const fetchData = async () => {
            const type = tipo === 'cine' ? 'movie' : 'tv';
            const baseUrls = {
                datos: `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=es-ES`,
                credits: `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=es-ES`,
                videos: `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`
            };

            try {
                const [datosRes, creditsRes] = await Promise.all([
                    fetch(baseUrls.datos).then(r => r.json()),
                    fetch(baseUrls.credits).then(r => r.json())
                ]);
                setDatos(datosRes);
                setDatareparto(Array.isArray(creditsRes.cast) ? creditsRes.cast : []);
                setdProduccion(Array.isArray(creditsRes.crew) ? creditsRes.crew : []);

                // === VIDEOS CON PRIORIDAD MÉXICO ===
                const fetchPromises = [
                    ...LATAM_COUNTRIES.map(c =>
                        fetch(`${baseUrls.videos}&language=es-${c}`).then(r => r.json()).catch(() => ({ results: [] }))
                    ),
                    fetch(`${baseUrls.videos}&language=es-ES`).then(r => r.json()).catch(() => ({ results: [] })),
                    fetch(`${baseUrls.videos}&language=en-US`).then(r => r.json()).catch(() => ({ results: [] }))
                ];

                const responses = await Promise.all(fetchPromises);
                const allVideos = responses.flatMap((data, i) => {
                    const country = i < LATAM_COUNTRIES.length ? `es-${LATAM_COUNTRIES[i]}` : i === LATAM_COUNTRIES.length ? 'es-ES' : 'en-US';
                    return (data.results || []).map(v => ({ ...v, countryCode: country, language: country.split('-')[0], region: country.split('-')[1] }));
                });
                setDatavideo(allVideos);
            } catch (error) { console.error(error); }
        };
        fetchData();
    }, [tipo, id]);

    // === OBTENER TRAILER POR IDIOMA ===
    const getTrailerKey = () => {
        if (!datavideo.length) return DEFAULT_TRAILERS[selectedLanguage] || 'dQw4w9WgXcQ';

        const countries = selectedLanguage === 'es-MX' ? LATAM_COUNTRIES :
            selectedLanguage === 'es' ? ['ES'] : ['US', 'GB', 'CA', 'AU'];

        for (const country of countries) {
            const videos = datavideo.filter(v => v.region === country && v.type === "Trailer" && v.site === "YouTube");
            if (videos.length > 0) return videos[videos.length - 1]?.key;
        }

        const anyYouTube = datavideo.filter(v => v.site === "YouTube");
        return anyYouTube.length > 0 ? anyYouTube[anyYouTube.length - 1]?.key : DEFAULT_TRAILERS[selectedLanguage];
    };

    const trailerkey = getTrailerKey();
    const fecha = new Date(datos.release_date || datos.first_air_date || '');
    const fechaFormateada = !isNaN(fecha.getTime()) ? `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}` : "Sin fecha";

    // === RENDER ===
    return (
        <>
            {/* Banner */}
            <div className="banner animate__animated animate__fadeIn" style={{
                backgroundImage: `url(${IMG_URL}${datos.backdrop_path || ''})`,
                backgroundSize: 'cover', backgroundPosition: 'center 20%', backgroundRepeat: 'no-repeat',
                height: '80vh', maxHeight: '600px', position: 'relative', width: '100%'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)', zIndex: 1 }} />
                <div className="sombra animate__animated animate__fadeInLeft" style={{ position: 'relative', zIndex: 2, height: '100%', overflowY: 'auto', padding: '40px', animationDelay: '0.2s' }}>
                    <h1 className="pt-5 display-1 text-white animate__animated animate__fadeInDown" style={{ fontSize: '3.5rem', animationDelay: '0.3s' }}>{datos.title || datos.name || 'Sin título'}</h1>
                    <h5 className="pt-5 display-4 text-white animate__animated animate__fadeInUp" style={{ fontSize: '1.8rem', animationDelay: '0.4s' }}>{datos.tagline || ''}</h5>
                    {datos.genres?.length > 0 && <h5 className="display-5 text-white animate__animated animate__fadeIn" style={{ fontSize: '1.5rem', animationDelay: '0.5s' }}>Género: {datos.genres[0].name}</h5>}
                    <h5 className="display-5 text-white animate__animated animate__fadeIn" style={{ fontSize: '1.2rem', animationDelay: '0.6s' }}>Título Original: {datos.original_title || datos.original_name || 'N/A'}</h5>
                    <h5 className="display-5 text-white animate__animated animate__fadeIn" style={{ fontSize: '1.2rem', animationDelay: '0.7s' }}>Lenguaje Original: {datos.original_language || 'N/A'}</h5>
                    {datos.production_countries?.length > 0 && <h5 className="display-5 text-white animate__animated animate__fadeIn" style={{ fontSize: '1.2rem', animationDelay: '0.8s' }}>Producida en: {datos.production_countries[0]?.name || 'N/A'}</h5>}
                    {datos.vote_average > 0 && <h2 className="my-4 text-white animate__animated animate__zoomIn" style={{ animationDelay: '0.9s' }}>Average: <span className="badge bg-warning p-2" style={{ fontSize: '1.2rem' }}>{datos.vote_average.toFixed(1)}</span></h2>}
                    <p className="banner_descripcion text-white animate__animated animate__fadeIn" style={{ fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6, animationDelay: '1s' }}>{datos.overview || 'Sin descripción disponible.'}</p>
                    <div className="my-3 animate__animated animate__fadeInUp" style={{ animationDelay: '1.1s' }}>
                        {trailerkey && <button className="btn btn-danger me-2 transition-hover" onClick={() => setPlaytrailer(true)} style={{ padding: '10px 30px', fontSize: '1.1rem' }}>Play</button>}
                        <Link to="/inicio" className="btn btn-success transition-hover" style={{ padding: '10px 30px', fontSize: '1.1rem' }}>Regresar</Link>
                    </div>
                    <h5 className="py-3 text-secondary animate__animated animate__fadeIn" style={{ fontSize: '1.1rem', animationDelay: '1.2s' }}>Fecha de Lanzamiento: {fechaFormateada}</h5>
                </div>
            </div>

            {/* Modal Trailer */}
            <ModalTrailer playtrailer={playtrailer} trailerkey={trailerkey} selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage} onClose={() => setPlaytrailer(false)} videoCount={datavideo.length} />

            {/* Reparto */}
            <section className="container bg-dark my-3 py-5">
                <h3 className="text-center text-white py-4 animate__animated animate__fadeInDown">Reparto</h3>
                <div className="row row-cols-lg-6 m-2">
                    {datareparto.map((item, index) => (
                        <PersonCard key={index} person={item} type="cast" ruta={IMG_URL} />
                    ))}
                </div>
            </section>

            <hr className="py-1" />

            {/* Producción */}
            <section className="bg-black py-5">
                <div className="container">
                    <h3 className="text-center text-dark py-4 animate__animated animate__fadeInDown">Producción</h3>
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                        {dataproduccion.filter(item => item?.profile_path).map((item, index) => (
                            <PersonCard key={index} person={item} type="crew" ruta={IMG_URL} />
                        ))}
                    </div>
                    {dataproduccion.filter(item => item?.profile_path).length === 0 && (
                        <div className="text-center text-white-50 py-5 animate__animated animate__fadeIn">
                            <p>No hay imágenes de producción disponibles</p>
                        </div>
                    )}
                </div>
            </section>

            <style jsx="true">{`
                .transition-hover { transition: all 0.3s ease-in-out !important; }
                .transition-hover:hover { transform: translateY(-5px) !important; box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </>
    );
};

// === ESTILOS DEL MODAL ===
const modalStyles = {
    overlay: {
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, animation: 'fadeIn 0.2s ease'
    },
    container: {
        width: '90%', maxWidth: '1000px', backgroundColor: '#1e1e1e', borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden', animation: 'modalFadeIn 0.3s ease'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px',
        backgroundColor: '#2d2d2d', borderBottom: '1px solid #404040', flexWrap: 'wrap', gap: '10px'
    },
    title: { margin: 0, color: 'white', fontSize: '1.25rem', fontWeight: 600 },
    languageSelector: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    closeButton: {
        background: 'transparent', border: 'none', color: '#999', cursor: 'pointer',
        width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '6px', transition: 'all 0.2s ease'
    },
    content: { position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%', backgroundColor: '#000', overflow: 'hidden' },
    footer: {
        display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', backgroundColor: '#2d2d2d',
        borderTop: '1px solid #404040'
    },
    footerButton: {
        padding: '8px 32px', backgroundColor: '#dc3545', color: 'white', border: 'none',
        borderRadius: '6px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease'
    }
};

export default Detalle;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";

const Detalle = () => {

    const [datos, setDatos] = useState({});
    const [datareparto, setDatareparto] = useState([]);
    const [dataproduccion, setdProduccion] = useState([]);
    const [datavideo, setDatavideo] = useState([]);
    const [playtrailer, setPlaytrailer] = useState(false);

    // Prioridad máxima: Español México
    const [selectedLanguage, setSelectedLanguage] = useState('es-MX');
    const [availableLanguages, setAvailableLanguages] = useState(['es-MX', 'es', 'en']);

    const params = useParams();
    let tipo = params.tipo;
    let id = params.id;
    let API = "";

    if (tipo == "cine") {
        API = `https://api.themoviedb.org/3/movie/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
    } else {
        API = `https://api.themoviedb.org/3/tv/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
    }

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            console.error(error);
        }
    };

    let APIVideos = "";
    if (tipo == "cine") {
        APIVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269`;
    } else {
        APIVideos = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269`;
    }

    const getVideo = async () => {
        try {
            // Búsqueda fuerte de México primero
            const latamCountries = [
                'es-MX', // México siempre primero
                'es-CO', 'es-AR', 'es-CL', 'es-PE', 'es-VE', 'es-EC',
                'es-BO', 'es-PY', 'es-UY', 'es-CR', 'es-SV', 'es-GT',
                'es-HN', 'es-NI', 'es-PA', 'es-DO', 'es-PR'
            ];

            const fetchPromises = [];

            for (const country of latamCountries) {
                fetchPromises.push(
                    fetch(`${APIVideos}&language=${country}`)
                        .then(res => res.json())
                        .then(data => ({ country, data }))
                        .catch(() => ({ country, data: { results: [] } }))
                );
            }

            fetchPromises.push(
                fetch(`${APIVideos}&language=es-ES`)
                    .then(res => res.json())
                    .then(data => ({ country: 'es-ES', data }))
                    .catch(() => ({ country: 'es-ES', data: { results: [] } }))
            );

            fetchPromises.push(
                fetch(`${APIVideos}&language=en-US`)
                    .then(res => res.json())
                    .then(data => ({ country: 'en-US', data }))
                    .catch(() => ({ country: 'en-US', data: { results: [] } }))
            );

            const responses = await Promise.all(fetchPromises);

            let allVideos = [];

            for (const response of responses) {
                if (response.data.results && response.data.results.length > 0) {
                    const videosWithCountry = response.data.results.map(video => ({
                        ...video,
                        countryCode: response.country,
                        language: response.country.split('-')[0],
                        region: response.country.split('-')[1]
                    }));
                    allVideos = [...allVideos, ...videosWithCountry];
                }
            }

            setDatavideo(allVideos);
            setAvailableLanguages(['es-MX', 'es', 'en']);
            setSelectedLanguage('es-MX'); // Siempre inicia en México

            console.log(`✅ ${allVideos.length} trailers cargados (México priorizado)`);

        } catch (error) {
            console.error(error);
            setAvailableLanguages(['es-MX', 'es', 'en']);
        }
    };

    const getTrailerByLanguage = (language) => {
        if (!Array.isArray(datavideo) || datavideo.length === 0) {
            return getDefaultTrailer(language);
        }

        if (language === 'es-MX') {
            // BÚSQUEDA ESTRICTA PARA MÉXICO
            const mexicoFirst = ['MX', 'CO', 'AR', 'CL', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'CR', 'SV', 'GT', 'HN', 'NI', 'PA', 'DO', 'PR'];

            for (const country of mexicoFirst) {
                const videosInCountry = datavideo.filter(video =>
                    video.region === country &&
                    video.type === "Trailer" &&
                    video.site === "YouTube"
                );
                if (videosInCountry.length > 0) {
                    console.log(`🎥 Trailer MÉXICO encontrado en región: ${country}`);
                    return videosInCountry[videosInCountry.length - 1]?.key;
                }
            }

            // Nunca usar trailer de España cuando se elige México
            console.log("⚠️ No se encontró trailer mexicano, usando cualquier trailer latino");
        }

        // Para España e Inglés (normal)
        const languageToCountries = {
            'es': ['ES'],
            'en': ['US', 'GB', 'CA', 'AU']
        };

        const targetCountries = languageToCountries[language] || [];

        if (targetCountries.length > 0) {
            for (const country of targetCountries) {
                const videosInCountry = datavideo.filter(video =>
                    video.region === country &&
                    video.type === "Trailer" &&
                    video.site === "YouTube"
                );
                if (videosInCountry.length > 0) {
                    return videosInCountry[videosInCountry.length - 1]?.key;
                }
            }
        }

        // Cualquier trailer de YouTube como último recurso
        const anyYouTubeVideo = datavideo.filter(video => video.site === "YouTube");
        if (anyYouTubeVideo.length > 0) {
            return anyYouTubeVideo[anyYouTubeVideo.length - 1]?.key;
        }

        return getDefaultTrailer(language);
    };

    const getDefaultTrailer = (language) => {
        const movieTrailers = {
            'es-MX': 'g4Hbz2jLxvQ', // Avengers - Latino (buen ejemplo mexicano)
            'es': 'hIR8Ar-ZZ1A',
            'en': '6ZfuNTqbHE8'
        };
        return movieTrailers[language] || 'dQw4w9WgXcQ';
    };

    const trailerkey = getTrailerByLanguage(selectedLanguage);

    const APICredits = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&sort_by=popularity.desc`;

    const getReparto = async () => {
        try {
            const response = await fetch(APICredits);
            const data = await response.json();
            setDatareparto(Array.isArray(data.cast) ? data.cast : []);
            setdProduccion(Array.isArray(data.crew) ? data.crew : []);
        } catch (error) {
            console.error(error);
            setDatareparto([]);
            setdProduccion([]);
        }
    };

    useEffect(() => {
        getDatos();
        getReparto();
        getVideo();
    }, []);

    const ruta = "https://image.tmdb.org/t/p/original/";
    const rutaPel = "/peliculas/";

    const fecha = new Date(datos.release_date || datos.first_air_date || '');
    const fechaFormateada = !isNaN(fecha.getTime())
        ? `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
        : "Sin fecha";

    const renderTrailer = () => {
        const getYouTubeLanguage = () => {
            if (selectedLanguage === 'es-MX') return 'es-MX'; // Fuerza español mexicano en YouTube
            return selectedLanguage === 'es' ? 'es' : 'en';
        };

        return (
            <YouTube
                videoId={trailerkey}
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                        cc_load_policy: 1,
                        hl: getYouTubeLanguage(),
                        cc_lang_pref: getYouTubeLanguage(),
                        iv_load_policy: 3,
                        persist_hl: 1
                    }
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
                onReady={(event) => {
                    try {
                        event.target.setOption('captions', 'track', { 'languageCode': getYouTubeLanguage() });
                    } catch (e) {
                        console.log('No se pudo configurar subtítulos');
                    }
                }}
            />
        )
    }

    return (
        <>
            {/* Banner con animación */}
            <div className="banner animate__animated animate__fadeIn" style={{
                backgroundImage: `url(${ruta}${datos.backdrop_path || ''})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
                backgroundRepeat: 'no-repeat',
                height: '80vh',
                maxHeight: '600px',
                position: 'relative',
                width: '100%'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)',
                    zIndex: 1
                }} />

                <div className="sombra animate__animated animate__fadeInLeft" style={{ position: 'relative', zIndex: 2, height: '100%', overflowY: 'auto', padding: '40px', animationDelay: '0.2s' }}>
                    <h1 className="pt-5 display-1 banner_titulo text-white animate__animated animate__fadeInDown" style={{ fontSize: '3.5rem', marginTop: 0, animationDelay: '0.3s' }}>
                        {datos.title || datos.name || 'Sin título'}
                    </h1>
                    <h5 className="pt-5 display-4 banner_titulo text-white animate__animated animate__fadeInUp" style={{ fontSize: '1.8rem', animationDelay: '0.4s' }}>
                        {datos.tagline || ''}
                    </h5>

                    {datos.genres && datos.genres.length > 0 && (
                        <h5 className="display-5 banner_titulo text-white animate__animated animate__fadeIn" style={{ fontSize: '1.5rem', animationDelay: '0.5s' }}>
                            Género: {datos.genres[0].name}
                        </h5>
                    )}

                    <h5 className="display-5 text-white animate__animated animate__fadeIn" style={{ fontSize: '1.2rem', animationDelay: '0.6s' }}>
                        Título Original: {datos.original_title || datos.original_name || 'N/A'}
                    </h5>
                    <h5 className="display-5 text-white animate__animated animate__fadeIn" style={{ fontSize: '1.2rem', animationDelay: '0.7s' }}>
                        Lenguaje Original: {datos.original_language || 'N/A'}
                    </h5>
                    {datos.production_countries && datos.production_countries.length > 0 && (
                        <h5 className="display-5 text-white animate__animated animate__fadeIn" style={{ fontSize: '1.2rem', animationDelay: '0.8s' }}>
                            Producida en: {datos.production_countries[0]?.name || 'N/A'}
                        </h5>
                    )}
                    {datos.vote_average > 0 && (
                        <h2 className="my-4 text-white animate__animated animate__zoomIn" style={{ animationDelay: '0.9s' }}>
                            Average: <span className="badge bg-warning p-2" style={{ fontSize: '1.2rem' }}>
                                {datos.vote_average.toFixed(1)}
                            </span>
                        </h2>
                    )}

                    <p className="banner_descripcion text-white animate__animated animate__fadeIn" style={{ fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6, animationDelay: '1s' }}>
                        {datos.overview || 'Sin descripción disponible.'}
                    </p>

                    <div className="my-3 animate__animated animate__fadeInUp" style={{ animationDelay: '1.1s' }}>
                        {trailerkey && (
                            <button className="btn btn-danger me-2 transition-hover" onClick={() => setPlaytrailer(true)} style={{ padding: '10px 30px', fontSize: '1.1rem' }}>
                                Play
                            </button>
                        )}
                        <Link to="/inicio" className="btn btn-success transition-hover" style={{ padding: '10px 30px', fontSize: '1.1rem' }}>
                            Regresar
                        </Link>
                    </div>
                    <p><h5 className="py-3 text-secondary animate__animated animate__fadeIn" style={{ fontSize: '1.1rem', animationDelay: '1.2s' }}>
                        Fecha de Lanzamiento: {fechaFormateada}
                    </h5></p>
                </div>
            </div>

            {/* MODAL TRAILER CON BOTONES CLAROS */}
            {playtrailer && trailerkey && (
                <div style={modalStyles.overlay} onClick={() => setPlaytrailer(false)}>
                    <div style={modalStyles.container} onClick={(e) => e.stopPropagation()}>
                        <div style={modalStyles.header}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                <h3 style={modalStyles.title}>Trailer</h3>

                                <div style={modalStyles.languageSelector}>
                                    {/* ESPAÑOL MÉXICO - PRIORIDAD MÁXIMA */}
                                    <button
                                        style={{
                                            ...modalStyles.languageButton,
                                            backgroundColor: selectedLanguage === 'es-MX' ? '#28a745' : 'rgba(255,255,255,0.1)',
                                            border: selectedLanguage === 'es-MX' ? '2px solid #28a745' : '1px solid #404040',
                                            fontWeight: selectedLanguage === 'es-MX' ? 'bold' : 'normal',
                                            transform: selectedLanguage === 'es-MX' ? 'scale(1.05)' : 'scale(1)',
                                            boxShadow: selectedLanguage === 'es-MX' ? '0 0 15px rgba(40,167,69,0.5)' : 'none'
                                        }}
                                        onClick={() => setSelectedLanguage('es-MX')}
                                    >
                                        <span style={{ marginRight: '6px', fontSize: '1.2rem' }}>🇲🇽</span>
                                        <strong>Español México</strong>
                                        {selectedLanguage === 'es-MX' && <span style={{ marginLeft: '6px', color: '#28a745' }}>✓</span>}
                                    </button>

                                    {/* ESPAÑOL ESPAÑA - Claramente separado */}
                                    <button
                                        style={{
                                            ...modalStyles.languageButton,
                                            backgroundColor: selectedLanguage === 'es' ? '#28a745' : 'rgba(255,255,255,0.1)',
                                            border: selectedLanguage === 'es' ? '2px solid #28a745' : '1px solid #404040'
                                        }}
                                        onClick={() => setSelectedLanguage('es')}
                                    >
                                        <span style={{ marginRight: '4px' }}>🇪🇸</span> Español España
                                    </button>

                                    <button
                                        style={{
                                            ...modalStyles.languageButton,
                                            backgroundColor: selectedLanguage === 'en' ? '#28a745' : 'rgba(255,255,255,0.1)',
                                            border: selectedLanguage === 'en' ? '2px solid #28a745' : '1px solid #404040'
                                        }}
                                        onClick={() => setSelectedLanguage('en')}
                                    >
                                        <span style={{ marginRight: '4px' }}>🇬🇧</span> English
                                    </button>
                                </div>
                            </div>

                            <button style={modalStyles.closeButton} onClick={() => setPlaytrailer(false)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div style={modalStyles.content}>
                            {renderTrailer()}
                        </div>

                        <div style={modalStyles.footer}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                {datavideo.length === 0 && (
                                    <span style={{ color: '#ffc107', fontSize: '0.85rem' }}>
                                        ⚡ Mostrando video promocional
                                    </span>
                                )}
                                <button style={modalStyles.footerButton} onClick={() => setPlaytrailer(false)}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reparto con animaciones */}
            <section className="container bg-dark my-3 py-5">
                <h3 className="text-center text-white py-4 animate__animated animate__fadeInDown">Reparto</h3>
                <div className="row row-cols-lg-6 m-2">
                    {Array.isArray(datareparto) && datareparto.map((item, index) => (
                        item?.profile_path ? (
                            <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 animate__animated animate__fadeInUp"
                                key={index}
                                style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="card resaltar text-center h-100 transition-hover">
                                    <img src={ruta + item.profile_path} className="card-img-top" alt={item.name} />
                                    <p className="small">
                                        {item.name}<br />
                                        <span className="small text-black">{item.character}</span><br />
                                        <span className="small text-dark"><b>Popularidad: {item.popularity?.toFixed(1) || 'N/A'}</b></span>
                                    </p>
                                    <div className="card-footer">
                                        <Link to={`/actores/${item.id}/peliculas`} className="btn btn-danger btn-sm w-100">Películas</Link>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>
            </section>

            <hr className="py-1" />

            {/* Producción con animaciones */}
            <section className="bg-black py-5">
                <div className="container">
                    <h3 className="text-center text-dark py-4 animate__animated animate__fadeInDown">Producción</h3>
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                        {Array.isArray(dataproduccion) && dataproduccion
                            .filter(item => item?.profile_path && item.profile_path !== "")
                            .map((item, index) => (
                                <div className="col mb-4 animate__animated animate__zoomIn"
                                    key={index}
                                    style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="card h-100 bg-dark text-white border-0 transition-hover">
                                        <img
                                            src={ruta + item.profile_path}
                                            className="card-img-top rounded-3"
                                            alt={item.name}
                                            style={{ height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                                        />
                                        <div className="card-body text-center p-2">
                                            <h6 className="card-title mb-1" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                {item.name || 'Sin nombre'}
                                            </h6>
                                            <p className="card-text small text-warning mb-0">
                                                {item.job || 'Sin rol'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {(!Array.isArray(dataproduccion) || dataproduccion.filter(item => item?.profile_path).length === 0) && (
                        <div className="text-center text-white-50 py-5 animate__animated animate__fadeIn">
                            <p>No hay imágenes de producción disponibles</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Estilos para transiciones hover */}
            <style jsx="true">{`
                .transition-hover {
                    transition: all 0.3s ease-in-out !important;
                }
                .transition-hover:hover {
                    transform: translateY(-5px) !important;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important;
                }
            `}</style>
        </>
    )
}

// Estilos del modal (sin cambios)
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.2s ease'
    },
    container: {
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        animation: 'modalFadeIn 0.3s ease'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#2d2d2d',
        borderBottom: '1px solid #404040',
        flexWrap: 'wrap',
        gap: '10px'
    },
    title: {
        margin: 0,
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 600
    },
    languageSelector: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    languageButton: {
        padding: '8px 16px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center'
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        color: '#999',
        cursor: 'pointer',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        transition: 'all 0.2s ease'
    },
    content: {
        position: 'relative',
        width: '100%',
        height: '0',
        paddingBottom: '56.25%',
        backgroundColor: '#000',
        overflow: 'hidden'
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '16px 24px',
        backgroundColor: '#2d2d2d',
        borderTop: '1px solid #404040'
    },
    footerButton: {
        padding: '8px 32px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    }
};

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    `;
    document.head.appendChild(style);
}

export default Detalle;
import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

const DetallesPeliculas = () => {
  const [datos, setDatos] = useState(null);
  const [reparto, setReparto] = useState([]);
  const [produccion, setProduccion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [error, setError] = useState(null);
  const [showFullCast, setShowFullCast] = useState(false);
  const [showFullCrew, setShowFullCrew] = useState(false);
  const [activeTab, setActiveTab] = useState("cast");
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [filteredTrailers, setFilteredTrailers] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [similarContent, setSimilarContent] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  const { id } = useParams();
  const { tipo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener el estado de navegación para saber de dónde vino el usuario
  const from = location.state?.from || "/";

  const API_KEY = "ecbcdcf9044928d12b179d9153f5a269";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/";

  const fetchDatos = async () => {
    try {
      setLoading(true);
      const endpoint = tipo === "cine" ? `movie/${id}` : `tv/${id}`;
      const response = await fetch(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=es-ES&append_to_response=videos,images,similar,recommendations`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setDatos(data);

      // Procesar y filtrar los trailers con prioridades mejoradas
      if (data.videos?.results) {
        const trailerList = data.videos.results
          .filter(video => (
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser" || video.type === "Clip") &&
            (['en', 'mx', 'es'].includes(video.iso_639_1))
          ))
          .sort((a, b) => {
            // Prioridad 1: Tipo (Trailer > Teaser > Clip)
            const typeOrder = { 'Trailer': 1, 'Teaser': 2, 'Clip': 3 };
            if (typeOrder[a.type] < typeOrder[b.type]) return -1;
            if (typeOrder[a.type] > typeOrder[b.type]) return 1;
            
            // Prioridad 2: Idioma (español latino > español de España > inglés)
            const langOrder = { 'mx': 1, 'es': 2, 'en': 3 };
            if (langOrder[a.iso_639_1] < langOrder[b.iso_639_1]) return -1;
            if (langOrder[a.iso_639_1] > langOrder[b.iso_639_1]) return 1;
            
            // Prioridad 3: Tamaño (mayor primero)
            return (b.size || 0) - (a.size || 0);
          });

        setFilteredTrailers(trailerList);
        if (trailerList.length > 0) {
          // Seleccionar el mejor tráiler por defecto
          const defaultTrailer = trailerList.find(t => t.type === "Trailer" && t.iso_639_1 === "mx") || 
                               trailerList.find(t => t.type === "Trailer" && t.iso_639_1 === "es") || 
                               trailerList.find(t => t.type === "Trailer" && t.iso_639_1 === "en") || 
                               trailerList[0];
          setSelectedTrailer(defaultTrailer);
        }
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCredits = async () => {
    try {
      setLoadingCredits(true);
      const endpoint = tipo === "cine" ? `movie/${id}/credits` : `tv/${id}/credits`;
      const response = await fetch(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=es-ES`
      );

      if (!response.ok) {
        throw new Error(`Error al obtener créditos: ${response.status}`);
      }

      const data = await response.json();

      // Filtrar solo miembros del reparto con imagen
      const sortedCast = [...data.cast]
        .filter(person => person.profile_path)
        .sort((a, b) => b.popularity - a.popularity);

      // Filtrar solo miembros del equipo con imagen
      const sortedCrew = [...data.crew]
        .filter(person => person.profile_path)
        .sort((a, b) => {
          if (a.department < b.department) return -1;
          if (a.department > b.department) return 1;
          return b.popularity - a.popularity;
        });

      setReparto(sortedCast || []);
      setProduccion(sortedCrew || []);
      setLoadingCredits(false);
    } catch (err) {
      console.error("Error fetching credits:", err);
      setLoadingCredits(false);
    }
  };

  const fetchSimilarContent = async () => {
    try {
      setLoadingSimilar(true);
      const endpoint = tipo === "cine" ? `movie/${id}/similar` : `tv/${id}/similar`;
      const response = await fetch(
        `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=es-ES&page=1`
      );

      if (!response.ok) {
        throw new Error(`Error al obtener contenido similar: ${response.status}`);
      }

      const data = await response.json();
      const filteredSimilar = data.results.filter(item =>
        item.poster_path && (tipo === "cine" ? item.title : item.name)
      );

      setSimilarContent(filteredSimilar || []);
      setLoadingSimilar(false);
    } catch (err) {
      console.error("Error fetching similar content:", err);
      setLoadingSimilar(false);
    }
  };

  useEffect(() => {
    fetchDatos();
    fetchCredits();
    fetchSimilarContent();
  }, [id, tipo]);

  const getTitle = () => (tipo === "cine" ? datos?.title : datos?.name) || "Título no disponible";
  const getOriginalTitle = () => (tipo === "cine" ? datos?.original_title : datos?.original_name) || "N/A";
  const getReleaseDate = () => (tipo === "cine" ? datos?.release_date : datos?.first_air_date) || "Fecha desconocida";

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    return amount ? `$${amount.toLocaleString()}` : "Desconocido";
  };

  const groupCrewByDepartment = () => {
    return produccion.reduce((acc, person) => {
      if (!acc[person.department]) {
        acc[person.department] = [];
      }
      acc[person.department].push(person);
      return acc;
    }, {});
  };

  const handleTrailerButtonClick = () => {
    if (filteredTrailers.length > 0) {
      setShowTrailerModal(true);
    } else {
      const searchQuery = encodeURIComponent(`${getTitle()} ${tipo === "cine" ? "película" : "serie"} trailer`);
      window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
    }
  };

  const handleCloseTrailerModal = () => {
    setShowTrailerModal(false);
    setSelectedTrailer(filteredTrailers.length > 0 ? filteredTrailers[0] : null);
  };

  const getLanguageName = (code) => {
    const languages = {
      'en': 'Inglés',
      'es': 'Español (España)',
      'mx': 'Español Latino'
    };
    return languages[code] || code.toUpperCase();
  };

  const getTrailerTypeName = (type) => {
    const types = {
      'Trailer': 'Tráiler',
      'Teaser': 'Avance',
      'Clip': 'Clip'
    };
    return types[type] || type;
  };

  // Función para manejar el botón de volver
  const handleGoBack = () => {
    // Si hay un estado 'from' definido, usarlo para navegar
    if (from) {
      navigate(from);
    } 
    // Si no hay estado, verificar si viene de una búsqueda
    else if (location.state?.fromSearch) {
      navigate(-1);
    }
    // Por defecto, ir al inicio
    else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">
          <h4>Error al cargar los datos</h4>
          <p>{error}</p>
          <button onClick={handleGoBack} className="btn btn-primary">
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <h4>No se encontraron detalles</h4>
          <button onClick={handleGoBack} className="btn btn-primary">
            Volver
          </button>
        </div>
      </div>
    );
  }

  const groupedCrew = groupCrewByDepartment();
  const departments = Object.keys(groupedCrew).sort();

  return (
    <div className="position-relative">
      {/* Banner superior */}
      <div
        className="banner"
        style={{
          backgroundImage: `url(${IMG_BASE_URL}original${datos.backdrop_path})`,
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
        <div className="container position-relative h-100 d-flex flex-column justify-content-center">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h1 className="text-white mb-0 display-4">{getTitle()}</h1>
              <button 
                onClick={handleGoBack}
                className="btn btn-outline-light btn-lg"
              >
                ← Volver
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container py-4" style={{ marginTop: "-100px", position: "relative", zIndex: 2 }}>
        <div className="bg-dark text-white p-4 rounded-3 shadow-lg">
          <div className="row">
            {/* Poster */}
            <div className="col-md-3 mb-4 mb-md-0">
              <img
                src={datos.poster_path ? `${IMG_BASE_URL}w500${datos.poster_path}` : '/placeholder-poster.jpg'}
                className="img-fluid rounded-3 shadow"
                alt={`Poster de ${getTitle()}`}
                loading="lazy"
              />
            </div>

            {/* Detalles principales */}
            <div className="col-md-9">
              <div className="d-flex flex-wrap align-items-center mb-3">
                <h2 className="mb-0 me-3">{getTitle()}</h2>
                <span className="badge bg-primary fs-6 me-2">
                  {tipo === "cine" ? "Película" : "Serie"}
                </span>
                <span className="badge bg-success fs-6 me-2">
                  {datos.vote_average?.toFixed(1)} ★
                </span>
                <span className="text-muted">
                  ({datos.vote_count} votos)
                </span>
              </div>

              <p className="text-muted">
                <em>{getOriginalTitle()}</em> • {getReleaseDate().split('-')[0]} •{' '}
                {tipo === "cine" ? formatRuntime(datos.runtime) : `${datos.number_of_seasons} temporada(s)`}
              </p>

              {/* Géneros */}
              <div className="mb-3">
                {datos.genres?.map((genre) => (
                  <span key={genre.id} className="badge bg-secondary me-2">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Sinopsis */}
              <div className="mb-4">
                <h5>Sinopsis</h5>
                <p>{datos.overview || "Sinopsis no disponible."}</p>
              </div>

              {/* Detalles adicionales */}
              <div className="row">
                {tipo === "cine" && (
                  <>
                    <div className="col-md-4 mb-3">
                      <h6>Presupuesto</h6>
                      <p>{formatCurrency(datos.budget)}</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <h6>Recaudación</h6>
                      <p>{formatCurrency(datos.revenue)}</p>
                    </div>
                  </>
                )}
                <div className="col-md-4 mb-3">
                  <h6>Estado</h6>
                  <p>{datos.status || "Desconocido"}</p>
                </div>
                {datos.production_countries?.length > 0 && (
                  <div className="col-md-4 mb-3">
                    <h6>País</h6>
                    <p>{datos.production_countries[0].name}</p>
                  </div>
                )}
                {datos.original_language && (
                  <div className="col-md-4 mb-3">
                    <h6>Idioma original</h6>
                    <p>{datos.original_language.toUpperCase()}</p>
                  </div>
                )}
              </div>

              {/* Botón de tráiler con indicación de opciones disponibles */}
              <div className="mt-3">
                <button
                  onClick={handleTrailerButtonClick}
                  className="btn btn-danger"
                  disabled={filteredTrailers.length === 0}
                >
                  {filteredTrailers.length > 0 ? (
                    <>
                      Ver tráiler{filteredTrailers.length > 1 ? 'es' : ''} 
                      {filteredTrailers.length > 1 && (
                        <span className="ms-2 badge bg-light text-dark">
                          {filteredTrailers.length} opciones
                        </span>
                      )}
                    </>
                  ) : (
                    "No hay tráilers disponibles"
                  )}
                </button>
                {filteredTrailers.length > 0 && (
                  <div className="mt-2">
                    <small className="text-muted">
                      Disponible en: {filteredTrailers.map(t => getLanguageName(t.iso_639_1)).join(', ')}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal para tráilers */}
        {showTrailerModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content bg-dark">
                <div className="modal-header border-0">
                  <h5 className="modal-title">
                    {getTrailerTypeName(selectedTrailer?.type)} de {getTitle()} - {getLanguageName(selectedTrailer?.iso_639_1)}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={handleCloseTrailerModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-0">
                  {selectedTrailer && (
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1`}
                        title={selectedTrailer.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
                <div className="modal-footer border-0 d-flex justify-content-between">
                  {filteredTrailers.length > 1 && (
                    <div className="d-flex flex-wrap gap-2">
                      {filteredTrailers.map((trailer) => (
                        <button
                          key={trailer.id}
                          className={`btn btn-sm ${selectedTrailer?.id === trailer.id ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setSelectedTrailer(trailer)}
                        >
                          {getLanguageName(trailer.iso_639_1)} ({getTrailerTypeName(trailer.type)})
                        </button>
                      ))}
                    </div>
                  )}
                  <button 
                    className="btn btn-danger ms-auto"
                    onClick={handleCloseTrailerModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pestañas para elenco/equipo */}
        <div className="mt-5">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "cast" ? "active" : ""}`}
                onClick={() => setActiveTab("cast")}
              >
                Elenco
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "crew" ? "active" : ""}`}
                onClick={() => setActiveTab("crew")}
              >
                Equipo
              </button>
            </li>
          </ul>

          <div className="tab-content p-3 bg-dark rounded-bottom">
            {activeTab === "cast" ? (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Elenco de Actores</h3>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setShowFullCast(!showFullCast)}
                  >
                    {showFullCast ? 'Mostrar menos' : 'Mostrar todo el elenco'}
                  </button>
                </div>

                {loadingCredits ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : reparto.length > 0 ? (
                  <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4">
                    {reparto
                      .slice(0, showFullCast ? reparto.length : 12)
                      .map((item) => (
                        <div className="col" key={item.id}>
                          <div className="card h-100 border-0 bg-transparent">
                            <img
                              src={`${IMG_BASE_URL}w500${item.profile_path}`}
                              className="card-img-top rounded-3 shadow"
                              alt={item.name}
                              loading="lazy"
                            />
                            <div className="card-body text-center px-0">
                              <h5 className="card-title text-white">{item.name}</h5>
                              <p className="card-text text-muted">
                                {item.character || "Personaje no especificado"}
                              </p>
                              {item.popularity && (
                                <small className="text-info">
                                  Popularidad: {item.popularity.toFixed(1)}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="alert alert-info">
                    No hay información disponible sobre el elenco.
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Equipo de Producción</h3>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setShowFullCrew(!showFullCrew)}
                  >
                    {showFullCrew ? 'Mostrar menos' : 'Mostrar equipo completo'}
                  </button>
                </div>

                {loadingCredits ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : departments.length > 0 ? (
                  departments.map((department) => (
                    <div key={department} className="mb-5">
                      <h4 className="mb-4">{department}</h4>
                      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4">
                        {groupedCrew[department]
                          .slice(0, showFullCrew ? groupedCrew[department].length : 6)
                          .map((person) => (
                            <div className="col" key={person.credit_id}>
                              <div className="card h-100 border-0 bg-transparent">
                                <img
                                  src={`${IMG_BASE_URL}w500${person.profile_path}`}
                                  className="card-img-top rounded-3 shadow"
                                  alt={person.name}
                                  loading="lazy"
                                />
                                <div className="card-body text-center px-0">
                                  <h5 className="card-title text-white">{person.name}</h5>
                                  <p className="card-text text-muted">
                                    {person.job || department}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      {groupedCrew[department].length > 6 && !showFullCrew && (
                        <button
                          className="btn btn-link text-primary mt-2"
                          onClick={() => setShowFullCrew(true)}
                        >
                          Mostrar {groupedCrew[department].length - 6} más...
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="alert alert-info">
                    No hay información disponible sobre el equipo de producción.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contenido similar */}
        {(similarContent.length > 0 || datos.recommendations?.results?.length > 0) && (
          <section className="mt-5">
            <div className="container">
              <h2 className="mb-4 text-danger py-5">Contenido similar</h2>
              {loadingSimilar ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
                  {[...similarContent, ...(datos.recommendations?.results || [])]
                    .filter((item, index, self) =>
                      index === self.findIndex((t) => (
                        t.id === item.id
                      )) &&
                      item.poster_path &&
                      (tipo === "cine" ? item.title : item.name)
                    )
                    .slice(0, 5)
                    .map((item) => (
                      <div className="col" key={item.id}>
                        <Link
                          to={`/${tipo === "cine" ? "pelicula" : "serie"}/${item.id}?tipo=${tipo}`}
                          className="text-decoration-none"
                          state={{ from: location.pathname }}
                        >
                          <div className="card h-100 border-0 bg-transparent">
                            <img
                              src={item.poster_path ? `${IMG_BASE_URL}w500${item.poster_path}` : '/placeholder-poster.jpg'}
                              className="card-img-top rounded-3 shadow"
                              alt={tipo === "cine" ? item.title : item.name}
                              loading="lazy"
                            />
                            <div className="card-body text-center px-0">
                              <h5 className="card-title text-white">
                                {tipo === "cine" ? item.title : item.name}
                              </h5>
                              <p className="card-text text-muted">
                                {tipo === "cine" ? item.release_date?.split('-')[0] : item.first_air_date?.split('-')[0]}
                              </p>
                              <div className="d-flex justify-content-center align-items-center">
                                <span className="badge bg-primary me-2">
                                  {item.vote_average?.toFixed(1)} ★
                                </span>
                                <span className="badge bg-secondary">
                                  {tipo === "cine" ? "Película" : "Serie"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Galería de Imágenes */}
        {datos.images?.backdrops?.length > 0 && (
          <section className="mt-5">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Galería de Imágenes</h2>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowAllImages(!showAllImages)}
                >
                  {showAllImages ? 'Mostrar menos' : 'Mostrar todas'}
                </button>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {datos.images.backdrops.slice(0, showAllImages ? datos.images.backdrops.length : 6).map((image, index) => (
                  <div className="col" key={index}>
                    <img
                      src={`${IMG_BASE_URL}w500${image.file_path}`}
                      className="img-fluid rounded shadow"
                      alt={`Imagen ${index + 1} de ${getTitle()}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DetallesPeliculas;
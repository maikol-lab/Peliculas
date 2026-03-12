import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardPelicula from "../../components/CardPelicula";

const ActoresPeliculas = () => {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = 'ecbcdcf9044928d12b179d9153f5a269';
    const rutaImagen = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        const obtenerPeliculasActor = async () => {
            try {
                setCargando(true);

                // Obtener información del actor
                const actorUrl = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=es-ES`;
                const actorRes = await fetch(actorUrl);
                const actorData = await actorRes.json();

                if (!actorData.profile_path) {
                    setError("Este actor no tiene imagen disponible");
                    setCargando(false);
                    return;
                }

                // Obtener películas del actor - AQUÍ SE OBTIENEN LAS PELÍCULAS CON SUS POSTERS
                const peliculasUrl = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=es-ES`;
                const peliculasRes = await fetch(peliculasUrl);
                const peliculasData = await peliculasRes.json();

                setActor(actorData);

                // Filtrar películas que tengan imagen (poster_path) y ordenar por popularidad
                const peliculasConImagen = (peliculasData.cast || [])
                    .filter(peli => peli.poster_path) // ← AQUÍ SE FILTRAN LAS QUE TIENEN POSTER
                    .sort((a, b) => b.popularity - a.popularity);

                setPeliculas(peliculasConImagen);
                setCargando(false);
            } catch (err) {
                console.error("Error al cargar películas del actor:", err);
                setError("No se pudieron cargar las películas");
                setCargando(false);
            }
        };

        if (id) {
            obtenerPeliculasActor();
        }
    }, [id]);

    if (cargando) {
        return (
            <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="text-white mt-3">Cargando películas del actor...</p>
                </div>
            </div>
        );
    }

    if (error || !actor) {
        return (
            <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="display-1 mb-4">😕</div>
                    <h3 className="text-white">{error || "Actor no encontrado"}</h3>
                    <Link to="/actores" className="btn btn-danger mt-3">Ver todos los actores</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-dark text-secondary py-5 min-vh-100">
            <div className="container">
                {/* Cabecera con información del actor */}
                <div className="row mb-5">
                    <div className="col-md-3 col-lg-2 mb-4 mb-md-0">
                        <div className="position-relative">
                            <img
                                src={rutaImagen + actor.profile_path}
                                alt={actor.name}
                                className="img-fluid rounded-3 w-100"
                                style={{
                                    boxShadow: '0 20px 30px rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px'
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-md-9 col-lg-10">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <h1 className="display-4 text-white mb-0">{actor.name}</h1>
                            <Link to={`/actores/${id}`} className="btn btn-outline-danger btn-sm">
                                Ver perfil completo
                            </Link>
                        </div>

                        {actor.biography && (
                            <p className="text-white-50 mb-4" style={{ lineHeight: 1.8 }}>
                                {actor.biography.length > 300
                                    ? actor.biography.substring(0, 300) + '...'
                                    : actor.biography}
                            </p>
                        )}

                        <div className="d-flex gap-3">
                            <div className="bg-danger text-white px-4 py-2 rounded-pill">
                                <i className="fas fa-film me-2"></i>
                                {peliculas.length} {peliculas.length === 1 ? 'Película' : 'Películas'}
                            </div>
                            {actor.known_for_department && (
                                <div className="bg-secondary text-white px-4 py-2 rounded-pill">
                                    <i className="fas fa-star me-2"></i>
                                    {actor.known_for_department}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Grid de películas - AQUÍ SE RENDERIZAN LAS TARJETAS CON SUS POSTERS */}
                <h2 className="text-white mb-4">
                    <i className="fas fa-film me-2 text-danger"></i>
                    Filmografía de {actor.name}
                </h2>

                {peliculas.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="display-1 mb-4">😕</div>
                        <h3 className="text-white">No hay películas disponibles</h3>
                        <p className="text-white-50">Este actor no tiene películas registradas con imágenes</p>
                    </div>
                ) : (
                    <div className="row">
                        {peliculas.map((pelicula) => (
                            <div className="col-6 col-md-4 col-lg-3 mb-4" key={pelicula.id}>
                                <CardPelicula pelicula={pelicula} tipo="cine" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActoresPeliculas;
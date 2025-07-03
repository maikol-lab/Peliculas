import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';

const PeliculasActor = () => {
    const [actor, setActor] = useState(null);
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { actorId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener el estado de navegación para saber de dónde vino el usuario
    const from = location.state?.from || "/";

    const API_KEY = "ecbcdcf9044928d12b179d9153f5a269";
    const BASE_URL = "https://api.themoviedb.org/3";
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/";

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                setLoading(true);

                // Obtener detalles del actor
                const actorResponse = await fetch(
                    `${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=es-ES`
                );

                if (!actorResponse.ok) {
                    throw new Error(`Error ${actorResponse.status}: ${actorResponse.statusText}`);
                }

                const actorData = await actorResponse.json();
                setActor(actorData);

                // Obtener créditos del actor (películas)
                const creditsResponse = await fetch(
                    `${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}&language=es-ES`
                );

                if (!creditsResponse.ok) {
                    throw new Error(`Error al obtener créditos: ${creditsResponse.status}`);
                }

                const creditsData = await creditsResponse.json();

                // Filtrar solo películas con poster y ordenar por popularidad
                const filteredMovies = creditsData.cast
                    .filter(movie => movie.poster_path && movie.title)
                    .sort((a, b) => b.popularity - a.popularity);

                setPeliculas(filteredMovies);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchActorDetails();
    }, [actorId]);

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
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center">
                <h4>Error al cargar los datos del actor</h4>
                <p>{error}</p>
                <button onClick={handleGoBack} className="btn btn-primary mt-3">
                    Volver
                </button>
            </div>
        );
    }

    if (!actor) {
        return (
            <div className="alert alert-warning text-center">
                No se encontraron detalles del actor
                <button onClick={handleGoBack} className="btn btn-primary mt-3">
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-md-3">
                    <img
                        src={actor.profile_path ? `${IMG_BASE_URL}w500${actor.profile_path}` : '/placeholder-actor.jpg'}
                        className="img-fluid rounded shadow"
                        alt={actor.name}
                    />
                </div>
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <h1 className="display-4">{actor.name}</h1>
                            {actor.birthday && (
                                <p className="text-muted">
                                    Nacimiento: {actor.birthday}
                                    {actor.place_of_birth && ` en ${actor.place_of_birth}`}
                                </p>
                            )}
                            {actor.deathday && (
                                <p className="text-muted">Fallecimiento: {actor.deathday}</p>
                            )}
                        </div>
                        <button
                            onClick={handleGoBack}
                            className="btn btn-outline-success"
                        >
                            ← Volver
                        </button>
                    </div>

                    <h3 className="mt-4">Biografía</h3>
                    <p>{actor.biography || "Biografía no disponible."}</p>
                </div>
            </div>

            <h2 className="mb-4">Películas</h2>
            {peliculas.length > 0 ? (
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
                    {peliculas.map((pelicula) => (
                        <div className="col" key={pelicula.id}>
                            <Link
                                to={`/pelicula/${pelicula.id}?tipo=cine`}
                                className="text-decoration-none"
                                state={{ from: location.pathname }}
                            >
                                <div className="card h-100 border-0 bg-transparent">
                                    <img
                                        src={pelicula.poster_path ? `${IMG_BASE_URL}w500${pelicula.poster_path}` : '/placeholder-poster.jpg'}
                                        className="card-img-top rounded shadow"
                                        alt={pelicula.title}
                                        loading="lazy"
                                    />
                                    <div className="card-body text-center px-0">
                                        <h5 className="card-title text-white">{pelicula.title}</h5>
                                        <p className="card-text text-muted">
                                            {pelicula.release_date?.split('-')[0] || 'Año desconocido'}
                                        </p>
                                        <p className="card-text">
                                            <span className="badge bg-primary me-2">
                                                {pelicula.vote_average?.toFixed(1)} ★
                                            </span>
                                            <span className="badge bg-secondary">
                                                {pelicula.character || 'Personaje'}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info">
                    No hay información disponible sobre las películas de este actor.
                </div>
            )}
        </div>
    );
};

export default PeliculasActor;
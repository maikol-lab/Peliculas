import { useEffect, useState } from "react";
import Carrusel from "../components/Carrusel";
import CardPeliculas from "../components/CardPeliculas";
import Paginador from "../components/Paginador";

const Inicio = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAllMovies, setShowAllMovies] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&page=${page}`
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

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
                    <button onClick={fetchMovies} className="btn btn-primary">
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Carrusel />

            <section className="py-5 bg-dark text-white">
                <div className="container">
                    <div className="text-end">
                        <button
                            className="btn btn-outline-light"
                            onClick={() => setShowAllMovies(!showAllMovies)}
                        >
                            {showAllMovies ? 'Mostrar menos' : 'Ver todas'}
                        </button>
                    </div>
                    <h2 className="text-center py-5 mb-0">INICIO</h2>

                    <div className="row g-4">
                        {movies.slice(0, showAllMovies ? movies.length : 8).map((movie) => (
                            <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <CardPeliculas item={movie} tipo="cine" />
                            </div>
                        ))}
                    </div>

                    {!showAllMovies && movies.length > 8 && (
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-link text-primary"
                                onClick={() => setShowAllMovies(true)}
                            >
                                Mostrar {movies.length - 8} películas más...
                            </button>
                        </div>
                    )}
                    
                    {/* Paginador movido a la parte inferior */}
                    <div className="mt-5 d-flex justify-content-center">
                        <Paginador page={page} setPage={setPage} totalPages={totalPages} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Inicio;
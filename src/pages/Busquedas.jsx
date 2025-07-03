import { useEffect, useState } from "react";
import Paginador from "../components/Paginador";
import { useLocation } from "react-router-dom";
import CardPeliculas from "../components/CardPeliculas";

const Busquedas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAllResults, setShowAllResults] = useState(false);
    const location = useLocation();
    const txtBuscar = location.state;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const API = `https://api.themoviedb.org/3/search/multi?api_key=ecbcdcf9044928d12b179d9153f5a269&query=${txtBuscar}&language=es-VE&page=${page}`;

    const getDatos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            // Filtrar solo películas/series con imagen
            const filteredResults = data.results.filter(item => 
                (item.media_type === 'movie' || item.media_type === 'tv') && 
                item.poster_path !== null
            );
            
            setDatos(filteredResults);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (txtBuscar) {
            getDatos();
        }
    }, [txtBuscar, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className="container py-5 text-center text-white">
                <div className="alert alert-danger">
                    <h4>Error al cargar los datos</h4>
                    <p>{error}</p>
                    <button onClick={getDatos} className="btn btn-primary">
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="py-5 bg-dark text-white">
                <div className="container">
                    <div className="text-end">
                        <button
                            className="btn btn-outline-light"
                            onClick={() => setShowAllResults(!showAllResults)}
                        >
                            {showAllResults ? 'Mostrar menos' : 'Ver todos'}
                        </button>
                    </div>
                    <h2 className="text-center py-5 mb-0">Resultados para: "{txtBuscar}"</h2>

                    {datos.length > 0 ? (
                        <>
                            <div className="row g-4">
                                {datos.slice(0, showAllResults ? datos.length : 8).map((item) => (
                                    <div key={`${item.id}-${item.media_type}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <CardPeliculas item={item} tipo={item.media_type} />
                                    </div>
                                ))}
                            </div>

                            {!showAllResults && datos.length > 8 && (
                                <div className="text-center mt-4">
                                    <button
                                        className="btn btn-link text-primary"
                                        onClick={() => setShowAllResults(true)}
                                    >
                                        Mostrar {datos.length - 8} resultados más...
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <h4>No se encontraron resultados con imágenes disponibles</h4>
                            <p>Intenta con otra búsqueda</p>
                        </div>
                    )}

                    {datos.length > 0 && (
                        <div className="mt-5 d-flex justify-content-center">
                            <Paginador page={page} setPage={handlePageChange} totalPages={totalPages} />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Busquedas;
import { useParams, useLocation } from "react-router-dom";
import CardPeliculas from "../components/CardPeliculas";
import { useEffect, useState } from "react";
import Paginador from "../components/Paginador";

const Categorias = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const location = useLocation();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Obtener el parámetro de página de la URL
        const queryParams = new URLSearchParams(location.search);
        const pageParam = queryParams.get('page');
        if (pageParam) {
            const pageNumber = parseInt(pageParam);
            if (!isNaN(pageNumber) && pageNumber !== page) {
                setPage(pageNumber);
            }
        } else {
            setPage(1);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let url = '';

                if (params.tipo === "cine") {
                    url = `https://api.themoviedb.org/3/discover/movie?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&with_genres=${params.id}&page=${page}`;
                } else if (params.tipo === "tv") {
                    url = `https://api.themoviedb.org/3/discover/tv?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&with_genres=${params.id}&page=${page}`;
                }

                const response = await fetch(url);
                if (!response.ok) throw new Error("Error al obtener datos");

                const data = await response.json();
                setDatos(data.results || []);
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            } catch (err) {
                setError(err.message);
                setDatos([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id, params.tipo, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            // Actualizar la URL sin recargar la página
            const newUrl = `${location.pathname}?page=${newPage}`;
            window.history.pushState({}, '', newUrl);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="text-white text-center py-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-white text-center py-5">
                <div className="alert alert-danger">
                    <h4>Error al cargar los datos</h4>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-primary"
                    >
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    if (!datos.length) {
        return (
            <div className="text-white text-center py-5">
                <div className="alert alert-info">
                    No se encontraron contenidos en esta categoría
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 text-white">
            <h3 className="text-center py-3">
                {params.tipo === "cine" ? "Películas" : "Series de TV"} - Página {page}
            </h3>

            <div className="row text-center py-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {datos.map((item) => (
                    <div key={item.id} className="col">
                        <CardPeliculas item={item} tipo={params.tipo} />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Paginador page={page} setPage={handlePageChange} totalPages={totalPages} />
                </div>
            )}
        </div>
    );
};

export default Categorias;
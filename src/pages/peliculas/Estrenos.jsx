import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardPelicula from "../../components/CardPelicula";

const Estrenos = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const API_KEY = 'ecbcdcf9044928d12b179d9153f5a269';

    // API para películas próximas (estrenos)
    const API_ESTRENOS = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=${paginaActual}`;

    useEffect(() => {
        const obtenerEstrenos = async () => {
            setCargando(true);
            try {
                const response = await fetch(API_ESTRENOS);
                const data = await response.json();

                // Filtrar películas que tengan imagen
                const peliculasConImagen = (data.results || []).filter(peli => peli.poster_path);

                setPeliculas(peliculasConImagen);
                setTotalPaginas(data.total_pages || 1);
            } catch (error) {
                console.error("Error al cargar estrenos:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerEstrenos();
    }, [paginaActual]);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (cargando) {
        return (
            <div className="container-fluid bg-dark text-secondary min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="text-white mt-3">Cargando próximos estrenos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-dark text-secondary py-5 min-vh-100">
            {/* CAMBIO: container en lugar de container-fluid para limitar el ancho */}
            <div className="container">
                {/* Encabezado - Mismo estilo que Tendencias */}
                <h1 className="text-center text-white py-4">
                    <span className="text-danger">🎬</span> Próximos Estrenos
                </h1>

                <p className="text-center text-white-50 mb-5">
                    Las películas que llegarán muy pronto a la pantalla grande
                </p>

                {/* Grid de películas - MISMA GRILLA QUE TENDENCIAS */}
                {peliculas.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="display-1 mb-4">😕</div>
                        <h3 className="text-white">No hay estrenos disponibles</h3>
                        <p className="text-white-50 mt-3">Pronto habrá novedades</p>
                    </div>
                ) : (
                    <>
                        <div className="row">
                            {peliculas.map((pelicula) => (
                                <div className="col-6 col-md-4 col-lg-3 mb-4" key={pelicula.id}>
                                    <CardPelicula pelicula={pelicula} tipo="cine" />
                                </div>
                            ))}
                        </div>

                        {/* Paginación */}
                        {totalPaginas > 1 && (
                            <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => cambiarPagina(paginaActual - 1)}
                                    disabled={paginaActual === 1}
                                >
                                    ← Anterior
                                </button>

                                <span className="text-white">
                                    Página {paginaActual} de {totalPaginas}
                                </span>

                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => cambiarPagina(paginaActual + 1)}
                                    disabled={paginaActual === totalPaginas}
                                >
                                    Siguiente →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Estrenos;
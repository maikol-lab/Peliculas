import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APIPPopularesCine = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';

const FiltroGenerosCine = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getDatos = async () => {
        try {
            const response = await fetch(APIPPopularesCine);

            if (!response.ok) {
                throw new Error("Error al cargar los géneros");
            }

            const data = await response.json();
            setDatos(data.genres || []); // 
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    if (loading) {
        return <p>Cargando géneros...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <>
            {datos.map((genero) => (
                <li key={genero.id}>
                    <Link
                        to={`categorias/${genero.id}/cine?page=1`}
                        className="dropdown-item"
                    >
                        {genero.name}
                    </Link>
                </li>
            ))}
        </>
    );
};

export default FiltroGenerosCine;
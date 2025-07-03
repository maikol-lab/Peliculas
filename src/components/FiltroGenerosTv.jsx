import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const APIGenerosTV = 'https://api.themoviedb.org/3/genre/tv/list?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';

const FiltroGenerosTV = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const getDatos = async () => {
        try {
            const response = await fetch(APIGenerosTV);

            if (!response.ok) {
                throw new Error("Error al cargar los géneros de TV");
            }

            const data = await response.json();
            setDatos(data.genres || []);
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
        return <p>Cargando géneros de TV...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <>
            {datos.map((genero) => (
                <li key={genero.id}>
                    <Link
                        to={`categorias/${genero.id}/tv?page=1`}
                        className="dropdown-item"
                    >
                        {genero.name}
                    </Link>
                </li>
            ))}
        </>
    );
};

export default FiltroGenerosTV;
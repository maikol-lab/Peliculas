import React, { useEffect, useState } from 'react';
import CardPeliculas from '../components/CardPeliculas';
import Paginador from '../components/Paginador';

const Recientes = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = "ecbcdcf9044928d12b179d9153f5a269";
  const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&page=${page}`;

  const getDatos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setDatos(data.results);
      setLoading(false);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
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
          <button onClick={getDatos} className="btn btn-primary">
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        <Paginador page={page} setPage={setPage} totalPages={totalPages} />
        <div className="text-end">
          <button
            className="btn btn-outline-light"
            onClick={() => setShowAllMovies(!showAllMovies)}
          >
            {showAllMovies ? 'Mostrar menos' : 'Ver todas'}
          </button>
        </div>
        <h2 className="text-center py-5 mb-0">Películas Recientes</h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {datos.slice(0, showAllMovies ? datos.length : 8).map((item) => (
            <CardPeliculas key={item.id} item={item} tipo={'cine'} />
          ))}
        </div>

        {!showAllMovies && datos.length > 8 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-link text-primary"
              onClick={() => setShowAllMovies(true)}
            >
              Mostrar {datos.length - 8} películas más...
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recientes;
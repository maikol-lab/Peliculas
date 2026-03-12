import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CardPelicula from "../../components/CardPelicula";
import { useEffect, useState } from "react";

const APIPelTendenciasCine = 'https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'; //tendencias cine
const APIEnTelevision = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';  //en television
const APIPelProximamente = 'https://api.themoviedb.org/3/movie/upcoming?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';   //proximamente 
const APIPelRecientes = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'; //en cartelera hoy
const APIPelMCTMDBEl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';  //mejor valoradas cine
const APIPelMCTMDBElTv = 'https://api.themoviedb.org/3/tv/top_rated?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';  //mejor valoradas tv

const Tendencias = () => {
  const params = useParams();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  let API = "";
  let titulo = "";
  let tipo = "";

  if (params.id === "tendenciascine") {
    API = APIPelTendenciasCine;
    titulo = "Tendencias en el Cine";
    tipo = "cine";
  }
  if (params.id === "tendenciastv") {
    API = APIEnTelevision;
    titulo = "Tendencias en TV";
    tipo = "tv";
  }
  if (params.id === "proximamente") {
    API = APIPelProximamente;
    titulo = "Proximamente";
    tipo = "cine";
  }
  if (params.id === "recientes") {
    API = APIPelRecientes;
    titulo = "Recientes";
    tipo = "cine";
  }
  if (params.id === "mejorValoradasCine") {
    API = APIPelMCTMDBEl;
    titulo = "Mejor Valoradas en el Cine";
    tipo = "cine";
  }
  if (params.id === "mejorValoradasTv") {
    API = APIPelMCTMDBElTv;
    titulo = "Mejor Valoradas en TV";
    tipo = "tv";
  }

  const getDatos = async (pagina = 1) => {
    setCargando(true);
    try {
      const response = await fetch(`${API}&page=${pagina}`);
      const data = await response.json();
      setDatos(data.results || []);
      setTotalPaginas(data.total_pages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    setPaginaActual(1); // Resetear página cuando cambia el tipo
    getDatos(1);
  }, [params.id]);

  useEffect(() => {
    getDatos(paginaActual);
  }, [paginaActual]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container text-white ">
      <h3 className="text-center py-4">{titulo}</h3>

      <div className="text-center py-4">
        <Link to="/tendencias/tendenciascine" className="btn btn-success btn-sm me-2">Tendencias Cine</Link>
        <Link to="/tendencias/tendenciastv" className="btn btn-dark btn-sm me-2">Tendencias Tv</Link>
        <Link to="/tendencias/proximamente" className="btn btn-info btn-sm me-2">Próximamente</Link>
        <Link to="/tendencias/recientes" className="btn btn-danger btn-sm me-2">Recientes</Link>
        <Link to="/tendencias/mejorValoradasCine" className="btn btn-light btn-sm me-2">Mejor Valoradas Cine</Link>
        <Link to="/tendencias/mejorValoradasTv" className="btn btn-warning btn-sm me-2">Mejor Valoradas Tv</Link>
      </div>

      {/* Indicador de carga */}
      {cargando && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando películas...</p>
        </div>
      )}

      {/* Grid de películas */}
      {!cargando && (
        <>
          <div className="row">
            {datos && datos.map((item, index) => (
              <div className="ccol-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                <CardPelicula pelicula={item} tipo={tipo} />
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="d-flex justify-content-center align-items-center my-5 gap-3">
              <button
                className="btn btn-outline-success"
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
              >
                ← Anterior
              </button>

              <span className="text-dark">
                Página {paginaActual} de {totalPaginas}
              </span>

              <button
                className="btn btn-outline-success"
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
  );
};

export default Tendencias;
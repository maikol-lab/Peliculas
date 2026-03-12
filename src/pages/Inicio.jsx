import CarouselStart from './home/CarouselStart'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const APIPelTendenciasCine = 'https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'; //tendencias cine

const Inicio = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const getDatos = async (pagina = 1) => {
    setCargando(true);
    try {
      // Agregamos el parámetro de página a la URL
      const response = await fetch(`${APIPelTendenciasCine}&page=${pagina}`);
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
    getDatos(paginaActual);
  }, [paginaActual]);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  let tipo = "cine";
  const ruta = "https://image.tmdb.org/t/p/w500";
  const rutaDetalle = "/detalle/";

  return (
    <>
      <CarouselStart /> {/* El carrusel SOLO está aquí */}
      <h3 className="text-center py-5 text-dark">INICIO</h3>

      <div className="container">
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
                <div
                  className="col-6 col-md-4 col-lg-3 mb-4"
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  data-aos-duration="600"
                  data-aos-once="true"
                >
                  <div
                    className="card h-100 animate__animated animate__fadeInUp"
                    data-bs-theme="dark"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationDuration: '0.6s'
                    }}
                  >
                    <div className="card-header p-0 overflow-hidden">
                      <img
                        src={ruta + item.poster_path}
                        className="img-fluid transition-hover"
                        alt="..."
                        style={{
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <p className="animate__animated animate__fadeIn"
                        style={{ animationDelay: `${index * 0.05 + 0.2}s` }}>
                        {item.title || item.name}
                      </p>
                    </div>
                    <div className="card-footer text-center">
                      <Link
                        to={rutaDetalle + tipo + '/' + item.id}
                        className="btn btn-success btn-sm mx-1 transition-hover"
                        style={{
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Detalle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="d-flex justify-content-center align-items-center my-5 gap-3 animate__animated animate__fadeInUp">
                <button
                  className="btn btn-outline-success transition-hover"
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ← Anterior
                </button>

                <span className="text-dark animate__animated animate__fadeIn"
                  style={{ animationDelay: '0.2s' }}>
                  Página {paginaActual} de {totalPaginas}
                </span>

                <button
                  className="btn btn-outline-success transition-hover"
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </>
  )
}

export default Inicio;
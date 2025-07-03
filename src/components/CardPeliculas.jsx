import { useState } from "react";
import { Link } from "react-router-dom";

/*En CardPeliculas agregamos los dos parametros  para la URl de las peliculas y sus Tipos junto con su modal y Detalles de la misma
 esos parametros son de Inicio, Mejorvaloradas y Recientes*/
const CardPeliculas = ({ item, tipo = "cine" }) => {
    const [showModal, setShowModal] = useState(false);
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="card h-100 border-0 bg-transparent">
            {/* Imagen de la película */}
            <div className="position-relative">
                {item.poster_path ? (
                    <img
                        src={`${IMG_BASE_URL}${item.poster_path}`}
                        className="card-img-top rounded-3 shadow"
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-poster.jpg';
                        }}
                    />
                ) : (
                    <div 
                        className="card-img-top rounded-3 shadow d-flex align-items-center justify-content-center bg-secondary" 
                        style={{ height: '450px' }}
                    >
                        <span className="text-white">Imagen no disponible</span>
                    </div>
                )}
                <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-warning text-dark">
                        {item.vote_average?.toFixed(1)} ★
                    </span>
                </div>
            </div>

            {/* Información de la película */}
            <div className="card-body text-center">
                <h5 className="card-title text-white">{item.title}</h5>
                <p className="card-text text-muted">
                    {item.release_date?.split('-')[0] || 'Fecha desconocida'}
                </p>
            </div>

            {/* Botones de acción */}
            <div className="card-footer bg-transparent border-0">
                <div className="d-flex justify-content-between gap-2">
                    <button
                        className="btn btn-outline-info flex-grow-1"
                        onClick={() => setShowModal(true)}
                    >
                        Vista rápida
                    </button>
                    <Link
                        to={`/detallespeliculas/${item.id}/${tipo}`}
                        className="btn btn-primary flex-grow-1"
                    >
                        Ver detalles
                    </Link>
                </div>
            </div>

            {/* Modal de vista rápida */}
            {showModal && (
                <div 
                    className="modal fade show" 
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onClick={() => setShowModal(false)}
                >
                    <div 
                        className="modal-dialog modal-lg modal-dialog-centered"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title">{item.title}</h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img
                                            src={item.poster_path
                                                ? `${IMG_BASE_URL}${item.poster_path}`
                                                : '/placeholder-poster.jpg'}
                                            className="img-fluid rounded mb-3 shadow"
                                            alt={item.title}
                                        />
                                        <div className="d-flex justify-content-center gap-2 mb-3">
                                            <span className="badge bg-primary">
                                                {item.vote_average?.toFixed(1)} ★
                                            </span>
                                            <span className="badge bg-secondary">
                                                {item.popularity?.toFixed(0)} popularidad
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-8">
                                        <h3 className="mb-3">{item.title}</h3>
                                        <div className="mb-4">
                                            <h5>Información</h5>
                                            <p><strong>Título original:</strong> {item.original_title}</p>
                                            <p><strong>Idioma original:</strong> {item.original_language.toUpperCase()}</p>
                                            <p><strong>Fecha de estreno:</strong> {item.release_date || 'Desconocida'}</p>
                                        </div>
                                        <h5>Sinopsis</h5>
                                        <p className="text-muted">
                                            {item.overview || 'No hay sinopsis disponible.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-footer border-secondary">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                                <Link
                                    to={`/detallespeliculas/${item.id}/${tipo}`}
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Ver detalles completos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardPeliculas;
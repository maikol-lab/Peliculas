import { Link } from "react-router-dom";
import { useState } from "react";
import ModalPelicula from "./ModalPelicula";

const ruta = "https://image.tmdb.org/t/p/w500";
const rutaDetalle = "/detalle/"

const CardPelicula = ({ pelicula, tipo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* ARREGLO: Quité el div col-* que estaba duplicado, ahora solo la tarjeta */}
            <div
                className="card h-100"
                style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.5)';
                    e.currentTarget.style.borderColor = '#28a745';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
            >
                <div className="position-relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                    <img
                        src={ruta + pelicula.poster_path}
                        className="img-fluid w-100 h-100"
                        alt={pelicula.title || pelicula.name}
                        style={{
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                    />

                    {/* Badge de popularidad */}
                    <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-danger rounded-pill px-2 py-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                <path d="M8 10L12 6L16 10M8 14L12 18L16 14" strokeLinecap="round" />
                            </svg>
                            {parseInt(pelicula.popularity)}
                        </span>
                    </div>

                    {/* Badge de calificación */}
                    <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-warning text-dark rounded-pill px-2 py-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                                <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" />
                            </svg>
                            {pelicula.vote_average?.toFixed(1)}
                        </span>
                    </div>
                </div>

                <div className="card-body text-center p-2">
                    <h6 className="fw-bold mb-1 text-white" style={{
                        fontSize: '0.9rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.5rem'
                    }}>
                        {pelicula.title || pelicula.name}
                    </h6>
                    <p className="small text-white-50 mb-2">
                        {pelicula.release_date?.split('-')[0] || pelicula.first_air_date?.split('-')[0] || 'N/A'}
                    </p>
                </div>

                <div className="card-footer text-center bg-transparent border-0 pb-3">
                    <div className="d-flex gap-2">
                        {/* Botón Vista Rápida (Modal) */}
                        <button
                            className="btn btn-info btn-sm flex-grow-1"
                            style={{
                                borderRadius: '20px',
                                transition: 'all 0.2s ease',
                                backgroundColor: '#17a2b8',
                                borderColor: '#17a2b8',
                                color: 'white'
                            }}
                            onClick={() => setIsModalOpen(true)}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 5px 10px rgba(23, 162, 184, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                <circle cx="12" cy="12" r="3" />
                                <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z" />
                            </svg>
                            Vista rápida
                        </button>

                        {/* Botón Detalle Completo */}
                        <Link
                            to={rutaDetalle + tipo + '/' + pelicula.id}
                            className="btn btn-success btn-sm flex-grow-1"
                            style={{
                                borderRadius: '20px',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 5px 10px rgba(40, 167, 69, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <circle cx="12" cy="8" r="1" fill="currentColor" />
                            </svg>
                            Detalle
                        </Link>
                    </div>
                </div>
            </div>
            

            {/* Modal Película */}
            <ModalPelicula
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                pelicula={pelicula}
                tipo={tipo}
            />
        </>
    )
}

export default CardPelicula;
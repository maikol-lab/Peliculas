import { Link } from "react-router-dom";
import { useEffect } from "react";

const ruta = "https://image.tmdb.org/t/p/w500";
const rutaDetalle = "/detalle/"

const ModalPelicula = ({ isOpen, onClose, pelicula, tipo }) => {
    // Bloquear el scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Cerrar con tecla Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    // Formatear fecha
    const formatFecha = (fecha) => {
        if (!fecha) return 'Fecha desconocida';
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };

    // Estilos del modal
    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease'
        },
        container: {
            position: 'relative',
            width: '90%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        closeButton: {
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            backdropFilter: 'blur(5px)',
            transition: 'all 0.3s ease'
        },
        content: {
            display: 'flex',
            height: '100%',
            minHeight: '500px'
        },
        imageSection: {
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            background: '#000'
        },
        imageContainer: {
            position: 'relative',
            width: '100%',
            height: '100%'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        badges: {
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            pointerEvents: 'none'
        },
        badgePopularidad: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
            borderRadius: '30px',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
        },
        badgeCalificacion: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #f7971e, #ffd200)',
            borderRadius: '30px',
            color: '#000',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
        },
        infoSection: {
            flex: 1,
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            color: 'white'
        },
        typeBadge: {
            marginBottom: '15px'
        },
        typeBadgeBase: {
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '1px',
            color: 'white'
        },
        title: {
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #fff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
        },
        metadata: {
            display: 'flex',
            gap: '15px',
            marginBottom: '25px',
            flexWrap: 'wrap'
        },
        metadataItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            fontSize: '0.9rem',
            color: '#e0e0e0',
            border: '1px solid rgba(255, 255, 255, 0.05)'
        },
        popularitySection: {
            marginBottom: '25px'
        },
        popularityHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '0.9rem',
            color: '#e0e0e0'
        },
        popularityValue: {
            fontWeight: 700,
            color: '#28a745'
        },
        popularityBar: {
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden'
        },
        popularityFill: {
            height: '100%',
            borderRadius: '10px',
            transition: 'width 1s ease'
        },
        overview: {
            marginBottom: '30px',
            flex: 1
        },
        overviewTitle: {
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '10px',
            color: '#28a745',
            letterSpacing: '1px'
        },
        overviewText: {
            lineHeight: 1.6,
            color: '#b0b0b0',
            fontSize: '0.95rem',
            maxHeight: '120px',
            overflowY: 'auto',
            paddingRight: '10px'
        },
        actions: {
            display: 'flex',
            gap: '15px',
            marginTop: '20px'
        },
        buttonPrimary: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            borderRadius: '50px',
            color: 'white',
            fontWeight: 600,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
        },
        buttonSecondary: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 24px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            color: 'white',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }
    };

    return (
        <div style={modalStyles.overlay} onClick={onClose}>
            <div style={modalStyles.container} onClick={(e) => e.stopPropagation()}>

                {/* Botón cerrar */}
                <button style={modalStyles.closeButton} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Contenido del modal */}
                <div style={modalStyles.content}>

                    {/* Lado izquierdo - Imagen */}
                    <div style={modalStyles.imageSection}>
                        <div style={modalStyles.imageContainer}>
                            <img
                                src={ruta + pelicula.poster_path}
                                alt={pelicula.title || pelicula.name}
                                style={modalStyles.image}
                            />

                            {/* Badges sobre la imagen */}
                            <div style={modalStyles.badges}>
                                <span style={modalStyles.badgePopularidad}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                        <path d="M8 10L12 6L16 10M8 14L12 18L16 14" strokeLinecap="round" />
                                    </svg>
                                    {parseInt(pelicula.popularity) || 0}
                                </span>
                                <span style={modalStyles.badgeCalificacion}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                                        <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" />
                                    </svg>
                                    {pelicula.vote_average?.toFixed(1) || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Lado derecho - Información */}
                    <div style={modalStyles.infoSection}>

                        {/* Tipo (Cine/TV) */}
                        <div style={modalStyles.typeBadge}>
                            <span style={{
                                ...modalStyles.typeBadgeBase,
                                backgroundColor: tipo === 'cine' ? '#667eea' : '#f093fb',
                                boxShadow: `0 4px 15px ${tipo === 'cine' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(240, 147, 251, 0.3)'}`
                            }}>
                                {tipo === 'cine' ? '🎬 PELÍCULA' : '📺 SERIE DE TV'}
                            </span>
                        </div>

                        {/* Título */}
                        <h2 style={modalStyles.title}>
                            {pelicula.title || pelicula.name}
                        </h2>

                        {/* Metadatos */}
                        <div style={modalStyles.metadata}>
                            <span style={modalStyles.metadataItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {pelicula.release_date?.split('-')[0] || pelicula.first_air_date?.split('-')[0] || 'Año N/A'}
                            </span>
                            <span style={modalStyles.metadataItem}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {pelicula.vote_count || 0} votos
                            </span>
                        </div>

                        {/* Barra de popularidad */}
                        <div style={modalStyles.popularitySection}>
                            <div style={modalStyles.popularityHeader}>
                                <span>Popularidad</span>
                                <span style={modalStyles.popularityValue}>{parseInt(pelicula.popularity) || 0}%</span>
                            </div>
                            <div style={modalStyles.popularityBar}>
                                <div style={{
                                    ...modalStyles.popularityFill,
                                    width: `${Math.min(pelicula.popularity || 0, 100)}%`,
                                    background: `linear-gradient(90deg, #28a745, ${(pelicula.popularity || 0) > 70 ? '#ffc107' : '#28a745'})`
                                }} />
                            </div>
                        </div>

                        {/* Sinopsis */}
                        <div style={modalStyles.overview}>
                            <h3 style={modalStyles.overviewTitle}>SINOPSIS</h3>
                            <p style={modalStyles.overviewText}>
                                {pelicula.overview || 'No hay sinopsis disponible para este título.'}
                            </p>
                        </div>

                        {/* Botones */}
                        <div style={modalStyles.actions}>
                            <Link
                                to={rutaDetalle + tipo + '/' + pelicula.id}
                                style={modalStyles.buttonPrimary}
                                onClick={onClose}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <circle cx="12" cy="8" r="1" fill="currentColor" />
                                </svg>
                                Ver detalles completos
                            </Link>
                            <button style={modalStyles.buttonSecondary} onClick={onClose}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Añadir animaciones globales
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

export default ModalPelicula;
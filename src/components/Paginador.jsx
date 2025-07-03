const Paginador = ({ page, setPage, totalPages }) => {
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="pagination-container" style={{
            border: '2px solid #1e40af',
            borderRadius: '50px', // Más redondeado (puedes ajustar este valor)
            padding: '10px',
            display: 'inline-flex',
            margin: '20px 0'
        }}>
            <div className="nav-links d-flex justify-content-center align-items-center gap-2">
                {/* Botón Anterior */}
                <button 
                    className={`prev page-numbers ${page === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: page === 1 ? 'not-allowed' : 'pointer',
                        opacity: page === 1 ? 0.5 : 1
                    }}
                >
                    <svg className="fill-white ic cc-c" viewBox="0 0 448 512" width="16" height="16">
                        <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path>
                    </svg>
                </button>
                
                {/* Página actual */}
                <span className="page-link current" style={{
                    backgroundColor: '#1e40af',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                }}>
                    {page}
                </span>
                
                {/* Separador */}
                <span className="extend" style={{
                    color: '#6b7280',
                    margin: '0 5px'
                }}>
                    De
                </span>
                
                {/* Última página */}
                <button 
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        padding: '5px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1e3a8a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    {totalPages}
                </button>
                
                {/* Botón Siguiente */}
                <button 
                    className={`next page-numbers ${page === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: page === totalPages ? 'not-allowed' : 'pointer',
                        opacity: page === totalPages ? 0.5 : 1
                    }}
                >
                    <svg className="fill-white ic cc-c" viewBox="0 0 448 512" width="16" height="16">
                        <path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Paginador;
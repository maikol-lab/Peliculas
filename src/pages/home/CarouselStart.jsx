import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import "./carousel.css"

const CarouselStart = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        dragFree: false,
        slidesToScroll: 1,
    });

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    const slides = [
        {
            id: 1,
            img: 'img/img1.jpeg',
            tagline: 'Acción/Ciencia Ficción',
            title: 'Avengers: Doomsday',
            cta: 'Fecha De Estreno: 18 de diciembre Del 2026 Solo En Cines',
        },
        {
            id: 2,
            img: 'img/imag2.jpg',
            tagline: 'Acción/Ciencia ficción',
            title: 'Masters of the Universe',
            cta: 'Fecha De Estreno: 5 de Junio Del 2026 Solo En Cines',
        },
        {
            id: 3,
            img: 'img/img3.jpg',
            tagline: 'Aventura/Ciencia ficción',
            title: 'Spider-Man: Brand New Day',
            cta: 'Fecha De Estreno: 31 de Julio Del 2026 Solo En Cines',
        },
    ];

    return (
        <div className="container-fluid carousel bg-light px-0 position-relative">
            <div className="row g-0 justify-content-end">
                {/* Carrusel principal */}
                <div className="col-12 col-lg-7 col-xl-9">
                    <div className="header-carousel embla bg-light py-5" ref={emblaRef}>
                        <div className="embla__container">
                            {slides.map((slide) => (
                                <div className="embla__slide" key={slide.id}>
                                    <div className="row g-0 header-carousel-item align-items-center">
                                        <div className="col-xl-6 carousel-img">
                                            <img
                                                src={slide.img}
                                                className="img-fluid w-100"
                                                alt={`Promo ${slide.id}`}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="col-xl-6 carousel-content p-4">
                                            <h4
                                                className="text-uppercase fw-bold mb-4"
                                                style={{ letterSpacing: '3px' }}
                                            >
                                                {slide.tagline}
                                            </h4>
                                            <h1 className="display-3 text-capitalize mb-4">
                                                {slide.title}
                                            </h1>
                                            
                                            <a
                                                className="btn btn-warning rounded-pill py-3 px-5 text-white"
                                                href="#"
                                                style={{ backgroundColor: '#fd7e14', borderColor: '#fd7e14' }}
                                            >
                                                {slide.cta}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Botones de navegación */}
                        <button
                            type="button"
                            className="embla__button embla__button--prev"
                            onClick={scrollPrev}
                            aria-label="Previous slide"
                        >
                            <span className="embla__button__svg" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 19l-7-7 7-7" />
                                </svg>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="embla__button embla__button--next"
                            onClick={scrollNext}
                            aria-label="Next slide"
                        >
                            <span className="embla__button__svg" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Banner lateral fijo */}
                <div className="col-12 col-lg-5 col-xl-3">
                    <div className="carousel-header-banner h-100 position-relative">
                        <img
                            src="img/img.png"
                            className="img-fluid w-100 h-100"
                            style={{ objectFit: 'cover' }}
                            alt="Special offer"
                        />
                        <div className="carousel-banner-offer position-absolute top-0 end-0 d-flex flex-column align-items-end p-3">
                            
                            
                        </div>
                        <div className="carousel-banner position-absolute bottom-0 start-0 end-0">
                            <div className="carousel-banner-content text-center p-4" style={{ background: 'rgba(0,0,0,0.7)', borderRadius: '8px' }}>
    
                            </div>
                            <a
                                href="#"
                                className="btn btn-warning rounded-pill py-2 px-4 d-block mt-3 text-white"
                                style={{ backgroundColor: '#fd7e14', borderColor: '#fd7e14' }}
                            >
                                <i className="bi bi-film me-2"></i> Solo En Cines
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarouselStart;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-indicators">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-current={i === 0 ? 'true' : undefined}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {[
          {
            src: 'images/banner5.jpg',
            title: '글래드 여의도',
            desc: '당신을 위한 호텔 제안 1',
          },
          {
            src: 'images/banner6.jpg',
            title: '나인트리 바이 파르나스 서울 명동',
            desc: '당신을 위한 호텔 제안 2',
          },
          {
            src: 'images/banner7.jpg',
            title: '서울 가든 호텔',
            desc: '당신을 위한 호텔 제안 3',
          },
          {
            src: 'images/banner8.jpg',
            title: '워커힐 더 글라스 하우스',
            desc: '당신을 위한 호텔 제안 4',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? 'active' : ''}`}
          >
            <img
              src={item.src}
              className="d-block w-100"
              alt={item.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
              }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>{item.title}</h1>
              <p>
                <h6>{item.desc}</h6>
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
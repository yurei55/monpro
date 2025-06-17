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
            src: 'https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/28071.jpg',
            title: '경원재 앰배서더 인천',
            desc: '당신을 위한 호텔 제안 1',
            link: 'http://localhost:3000/hotels/28071',
          },
          {
            src: 'https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/28317.jpg',
            title: '네스트 호텔 (a member of Design Hotels™)',
            desc: '당신을 위한 호텔 제안 2',
            link: 'http://localhost:3000/hotels/28317',
          },
          {
            src: 'https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/28288.jpg',
            title: '제이앤 파크 호텔',
            desc: '당신을 위한 호텔 제안 3',
            link: 'http://localhost:3000/hotels/28288',
          },
          {
            src: 'https://teama-leemw-s3.s3.ap-northeast-3.amazonaws.com/hotel/img/28210.jpg',
            title: '베스트웨스턴 프리미어 인천 에어포트 호텔',
            desc: '당신을 위한 호텔 제안 4',
            link: 'http://localhost:3000/hotels/28566',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`carousel-item ${idx === 0 ? 'active' : ''}`}
          >
            <a href={item.link}>
              <img
                  src={item.src}
                  className="d-block w-100"
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '600px',
                    objectFit: 'cover',
                  }}
              />
            </a>
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
import React from "react";

const HotelCard = ({ id, name, price, imageUrl }) => {
  return (
    <div className="col-sm-3 mb-3">
      <div className="card h-100">
        <div className="zoom_image text-center">
          <a href={`/product.html?id=${id}`}>
            <img
              src={imageUrl}
              alt={name}
              height="360"
              className="card-img-top img-fluid"
            />
          </a>
        </div>
        <div className="card-body bg-light text-center" style={{ fontSize: "15px" }}>
          <div className="card-title">
            <a href={`/product.html?id=${id}`}>{name}</a><br />
            <img src="images/i_hit.gif" alt="Hit" />&nbsp;
            <img src="images/i_new.gif" alt="New" />
          </div>
          <p className="card-text">
            <b>{price !== undefined
                ? `${Number(price).toLocaleString()} 원`
                : "가격 정보 없음"}</b><br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
import React from "react";
import { Link } from "react-router-dom";

export default function HotelCard({ id, name, price, imageUrl }) {
  return (
    <div className="card h-100">
      <Link to={`/product/${id}`}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={name}
          style={{ height: "360px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body bg-light text-center" style={{ fontSize: "15px" }}>
        <h5 className="card-title">
          <Link to={`/product/${id}`} className="text-decoration-none text-dark">
            {name}
          </Link>
        </h5>
        <p className="card-text">
          <b>{price.toLocaleString()} 원</b>
        </p>
      </div>
    </div>
  );
}
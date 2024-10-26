import React from "react";
import { BiBed, BiMap, BiMapAlt, BiTab } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./SingleProductCard.css";

const SingleProductCard = ({
  name,
  location,
  price,
  number_of_beds,
  number_of_bathrooms,
  dimensions,
  image,
  basis,
}) => {
  return (
    <div
      className="product-card"
      style={{ flexBasis: basis ? basis : "18rem" }}
    >
      <div className="product-image-wrapper">
        <Link to="/">
          <img src={image} alt={name} className="product-image" />
        </Link>
        <div className="product-info-overlay">
          <div className="product-info">
            <BiMap style={{ color: 'white'}} />
            <h4>{location}</h4>
          </div>
        </div>
      </div>
      <div className="product-details">
        <div className="product-info">
          <h3>{name}</h3>
        </div>
        <div className="product-info">
          <div className="icon-box">
            <BiBed />
          </div>
          <p>{number_of_beds} Beds</p>
        </div>
        <div className="product-info">
          <div className="icon-box">
            <BiTab />
          </div>
          <p>{number_of_bathrooms} Bathrooms</p>
        </div>
        <div className="product-info">
          <div className="icon-box">
            <BiMapAlt />
          </div>
          <p>{dimensions}</p>
        </div>
      </div>

      <div className="product-details">
        <h1 className="product-price">₹{price}</h1>
        <br />
        <button className="product-button">Details</button>
      </div>
    </div>
  );
};

export default SingleProductCard;

import React from "react";
import { property } from "./dummyData";
import SingleProductCard from "./SingleProductCard";
import "./Featured.css"; // Import your CSS file

const Featured = () => {
  return (
    <div className="featured-container">
      <div className="text-center">
        <h1 className="sub-heading">Featured</h1>
        <h1 className="heading">Explore featured latest PG's</h1>
      </div>
      <div className="featured-cards">
        {property.slice(0, 3).map((featured) => (
          <SingleProductCard key={featured.id} {...featured} />
        ))}
      </div>
    </div>
  );
};

export default Featured;

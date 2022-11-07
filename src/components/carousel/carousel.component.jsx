import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.styles.css";
import { Link } from "react-router-dom";

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      indicators={false}
      variant={"dark"}
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
    >
      <Carousel.Item>
        <div className="carousel-images-container">
          {props.books.map((book) => {
            return (
              <Link to={`/book/${book.book_id}`} key={book.book_id}>
                <img
                  className="carousel-cover-image"
                  src={book.cover_image}
                  width="100"
                  height="180"
                />
              </Link>
            );
          })}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-images-container">
          {props.books.map((book) => {
            return (
              <Link to={`/book/${book.book_id}`} key={book.book_id}>
                <img
                  className="carousel-cover-image"
                  src={book.cover_image}
                  width="100"
                  height="180"
                />
              </Link>
            );
          })}
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;

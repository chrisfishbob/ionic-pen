import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.styles.css";
import { Link } from "react-router-dom";

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let booksByPage = [[]];
  if (props.books && props.books.length > 0) {
    booksByPage = [];
    let n = 0;
    for (let i=0; i<props.books.length; i+=5) {
      booksByPage[n] = [];
      for (let j=i; j<Math.min(i+5, props.books.length); j++) {
        booksByPage[n].push(props.books[j]);
      }
      n += 1
    }
  }
 
  return (
    <Carousel
      indicators={false}
      variant={"dark"}
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
    >
      {booksByPage.map((booksPerPage) => {
        return (
          <Carousel.Item>
            <div className="carousel-images-container">
              {booksPerPage.map((book) => {
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
        )
      })}
      
    </Carousel>
  );
}

export default ControlledCarousel;

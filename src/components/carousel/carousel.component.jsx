import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./carousel.styles.css";
import { Link } from "react-router-dom";

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  let booksByPage = [];
  let booksOnPage = [];
  for (let i=0; i<pageSize; i++) {
    booksOnPage.push({isDummy: true});
  }
  booksByPage.push(booksOnPage);
  if (props.books && props.books.length > 0) {
    booksByPage = [];
    let booksCount = pageSize;
    let booksOnPage = []
    for (let i=0; i<props.books.length; i+=pageSize) {
      booksOnPage = []
      booksCount = Math.min(i+pageSize, props.books.length);
      for (let j=i; j<booksCount; j++) {
        props.books[j]['isDummy'] = false;
        booksOnPage.push(props.books[j]);
      }
      for (let j=booksCount; j<i+pageSize; j++) {
        booksOnPage.push({isDummy: true});
      }
      booksByPage.push(booksOnPage);
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
                if (book['isDummy'])
                  return <img
                      className="carousel-cover-image"
                      width="100"
                      height="180"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
                    />
                return <Link to={`/book/${book.book_id}`} key={book.book_id}>
                  <img
                    className="carousel-cover-image"
                    src={book.cover_image}
                    width="100"
                    height="180"
                  />
                </Link>
              })}
            </div>
          </Carousel.Item>
        )
      })}
      
    </Carousel>
  );
}

export default ControlledCarousel;

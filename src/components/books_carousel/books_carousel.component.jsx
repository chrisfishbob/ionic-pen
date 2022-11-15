import Carousel from "react-bootstrap/Carousel";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./books_carousel.styles.css";

function createNestedBooksArray(books, pageSize) {
  let booksByPage = [];
  let booksOnPage = [];
  if (books && books.length > 0) {
    let booksCount = pageSize;
    for (let i=0; i<books.length; i+=pageSize) {
      booksOnPage = [];
      booksCount = Math.min(i+pageSize, books.length);
      for (let j=i; j<booksCount; j++) {
        books[j]['isDummy'] = false;
        booksOnPage.push(books[j]);
      }
      for (let j=booksCount; j<i+pageSize; j++) {
        booksOnPage.push({isDummy: true});
      }
      booksByPage.push(booksOnPage);
    }
  } else {
    for (let i=0; i<pageSize; i++) {
      booksOnPage.push({isDummy: true});
    }
    booksByPage.push(booksByPage);
  }
  return booksByPage;
}

function BooksCarousel(props) {
  const [index, setIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [booksByPage, setBooksByPage] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const booksArray = createNestedBooksArray(props.books, pageSize);
    setBooksByPage(booksArray);
  }, [props.books]);
 
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
                if (book.isDummy)
                  return (<img
                      className="carousel-cover-image"
                      width="100"
                      height="180"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
                    />);
                return (<Link to={`/book/${book.book_id}`} key={book.book_id}>
                  <img
                    className="carousel-cover-image"
                    src={book.cover_image}
                    width="100"
                    height="180"
                  />
                </Link>);
              })}
            </div>
          </Carousel.Item>
        );
      })} 
    </Carousel>
  );
}

export default BooksCarousel;

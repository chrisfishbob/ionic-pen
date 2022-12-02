import Carousel from "react-bootstrap/Carousel";

import { useState, useEffect, useLayoutEffect } from "react";
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

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


function BooksCarousel(props) {
  const [window_width, window_height] = useWindowSize();
  const [index, setIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [booksByPage, setBooksByPage] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (window_width < 768) {
      setPageSize(1);
    } else {
      setPageSize(5);
    }
    console.log(pageSize)
  }, [window_width]);

  useEffect(() => {
    const booksArray = createNestedBooksArray(props.books, pageSize);
    setBooksByPage(booksArray);
  }, [props.books, pageSize]);
 
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
            <div className="book-carousel-images-container">
              {booksPerPage.map((book) => {
                if (book.isDummy)
                  return (<img
                      className="book-carousel-cover-image"
                      width="100"
                      height="180"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
                    />);
                return (<Link to={`/books/info/${book.book_id}`} key={book.book_id}>
                  <img
                    className="book-carousel-cover-image"
                    src={book.cover_image}
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
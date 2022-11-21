import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import IonicPenAPI from "../../IonicPenAPI";

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

function CatalogPage() {
  const [pageSize, setPageSize] = useState(6);
  const [booksByPage, setBooksByPage] = useState([]);

  useEffect(() => {
    IonicPenAPI.getAllBooks().then((response) => {
      response.books = [...response.books, ...response.books, ...response.books, ...response.books];
      let booksArray = createNestedBooksArray(response.books, pageSize);
      setBooksByPage(booksArray);
    });
  });

  return (
    <div style={{ margin: "2%" }}>
      <h1>
        All Books
      </h1>
      <center>
        <Container>
          {booksByPage.map((booksPerPage) => {
            return (
              <div>
                <Row>
                  {booksPerPage.map((book) => {
                    if (book.isDummy)
                      return (<Col>
                        <img
                          style={{width: "10vw", height: "18vw", margin: "1vw"}}
                          src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
                        />
                      </Col>);
                    return (<Col>
                      <Link to={`/books/info/${book.book_id}`} key={book.book_id}>
                        <img
                          style={{width: "10vw" , margin: "1vw"}}
                          src={book.cover_image}
                        />
                      </Link>
                    </Col>);
                  })}
                </Row>
              </div>
            );
          })} 
        </Container>
      </center>
    </div>
  );
}

export default CatalogPage;
import ListGroup from "react-bootstrap/listGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./reading_page.styles.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import IonicPenAPI from "../../IonicPenAPI";

function ReadingPage(props) {
  const { book_id } = useParams();
  const [chapterIndex, setChapterIndex] = useState(-1);
  const [showChapters, setShowChapters] = useState(false);
  const [bookData, setBookData] = useState({
    book_title: "",
    chapters: [],
    author: "",
    synopsis: "",
  });
  const [chapterData, setChapterData] = useState({
    chapter_name: "",
    chapter_contents: "",
    book_id: "",
    chapter_id: "",
  });

  useEffect(() => {
    if (chapterIndex >= 0 && bookData.chapters.length > 0) {
      let chapter = bookData.chapters[chapterIndex];
      IonicPenAPI.getBookChapter(chapter.chapter_id).then((res) => {
        setChapterData(res);
      });
      if (props.loggedIn) {
        IonicPenAPI.setBookmark(book_id, chapterIndex);
      }
    }
  }, [chapterIndex, bookData, props.loggedIn, book_id]);

  useEffect(() => {
    IonicPenAPI.getBookDetails(book_id).then((res) => {
      setBookData(res.book);
      let book = res.book;
      if (props.loggedIn) {
        IonicPenAPI.getBookmark(book_id).then((res) => {
          if (res && res.chapter_ind) {
            setChapterIndex(res.chapter_ind);
          } else {
            if (book.chapters.length > 0) {
                setChapterIndex(0);
            }
          }
        });
      } else {
        if (res.book.chapters.length > 0) {
          setChapterIndex(0);
        }
      }
    });
  }, [props.loggedIn, book_id]);

  return (
    <div style={{ margin: "2%" }}>
      <Offcanvas show={showChapters} onHide={() => setShowChapters(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{bookData.book_title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup as="ul">
            {bookData.chapters.map((chapter, ind) => {
              return ind === chapterIndex ? (
                <ListGroup.Item as="li" active>
                  {chapter.chapter_name}
                </ListGroup.Item>
              ) : (
                <ListGroup.Item
                  className="list_item"
                  as="li"
                  onClick={() => setChapterIndex(ind)}
                >
                  {chapter.chapter_name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <Button
        variant="outline-dark"
        onClick={() => setShowChapters(true)}
        style={{ marginBottom: "1%" }}
      >
        <h1> {bookData.book_title} </h1>
      </Button>
      {chapterIndex >= 0 && (
        <Card>
          <Card.Header>
            <Card.Title> {chapterData.chapter_name} </Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
              <div style={{ margin: "2%" }}>
                <p> {chapterData.chapter_contents} </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default ReadingPage;

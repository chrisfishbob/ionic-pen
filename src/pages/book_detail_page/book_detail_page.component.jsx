import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import IonicPenAPI from "../../IonicPenAPI";

import "./book_detail_page.styles.css";

function BookDetailPage(props) {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    cover_image:"",
    book_title: "",
    author: "",
    categories: [],
    age: "",
    wordcount: "",
    chapters: [],
    likes: [],
    synopsis: "",
    reviews: []
  });
  const [editable, setEditable] = useState(false);
  const [readmore, setReadMore] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);

  useEffect(() => {
    IonicPenAPI.getBookDetails(book_id).then((response) => {
      if (response) {
        if (response.book.wordcount.length === 0) {
          response.book.wordcount = "1000+"
        }
        setBook(response.book);
        setEditable(response.is_author);
      }
    });
    IonicPenAPI.getProfile().then((res) => {
      console.log(res.library)
      console.log(book_id)
      setInLibrary(res.library.includes(book_id))
    });
  }, [book_id]);


  function addToLibrary() {
    IonicPenAPI.addToLibrary(book_id).then(() => setInLibrary(true));
  }

  function removeFromLibrary() {
    IonicPenAPI.removeFromLibrary(book_id).then(() => setInLibrary(false));
  }

  return (
    <div style={{ marginTop: "2%" }}>
      <div className="top">
        <div className="left"> 
          <img
            className="recently-updated-cover-image"
            src={book.cover_image}
            width="100"
            height="auto"
            alt=""
          />
          <p className="read" style={{marginTop: "5%"}}>
            <a href={`/books/read/${book_id}`} style={{textDecoration: 'none'}}>Start Reading</a>
          </p>
        </div>
        <div className="header_corner">
          {props.loggedIn &&
            (inLibrary?
              <Button variant="outline-danger" onClick={removeFromLibrary}>
                Remove from Library
              </Button>:
              <Button variant="outline-success" onClick={addToLibrary}>
                Add to Library
              </Button>
            )
          }          
          <br></br>
          {editable &&
            <Button variant="outline-primary" onClick={()=>navigate(`/books/edit/${book_id}`)}>
              Edit Book ✎
            </Button>
          }
        </div>
        <div className="right">
          <p>
            <b>{book.book_title}</b>
              <br />
            <i>by {book.author}</i>
          </p>
          <p>
            {book.categories.join(", ")} <br />
            {book.age} <br />
            {book.wordcount} Words; {book.chapters.length} Chapters; {book.likes.length} Likes<br />
            <span className="review">Reviews ({book.reviews.length})</span>
          </p>
          <p>{book.synopsis}</p>
        </div>
      </div>
      <div className="down">
        <p>Reviews ({book.reviews.length})</p>
        {readmore || book.reviews.length < 3 ? 
          book.reviews.map((comment) => {
            return (
              <div>
                <p>
                  <b>{comment.title}</b>
                  <br />
                  <span className="reviewer">Review by {comment.reviewer}</span>
                  <br />
                </p>
                <p className="comment">{comment.comment}</p>
                <hr></hr>
              </div>
            );
          })
          : 
          book.reviews.slice(0, 2).map((comment) => {
            return (
              <div>
                <p>
                  <b>{comment.title}</b>
                  <br />
                  <span className="reviewer">Review by {comment.reviewer}</span>
                  <br />
                </p>
                <p className="comment">{comment.comment}</p>
                <hr></hr>
              </div>
            );
          })
        }
      </div>
      <div className="footer_corner">
        <p className="readmore" onClick={() => setReadMore(!readmore)}>All Reviews</p>
      </div>
    </div>
  );
}

export default BookDetailPage;

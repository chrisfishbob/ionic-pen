import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import IonicPenAPI from "../../IonicPenAPI";

import "./book_detail_page.styles.css";

function BookDetailPage() {
  const { book_id } = useParams();
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

  useEffect(() => {
    IonicPenAPI.getBookDetails(book_id).then((response) => {
      if (response) {
        setBook(response.book);
        setEditable(response.is_author);

      }
    });
  }, [book_id]);

  return (
    <div style={{ marginTop: "2%" }}>
        <div className="top">
            <div className="left"> 
                <img
                        className="recently-updated-cover-image"
                        src={book.cover_image}
                        width="100"
                        height="180"
                        alt=""
                    />
                <p className="read">
                  <a href={`/books/read/${book_id}`} style={{textDecoration: 'none'}}>Start Reading</a>
                </p>
            </div>
            <div className="header_corner">
                ♡
                {editable && <div>
                  <a href={`/books/edit/${book_id}`} style={{textDecoration: 'none'}}>✎</a>
                </div>}
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
            {}
            {readmore || book.reviews.length < 3 ? 
            book.reviews.map((comment) => {
                return (
                    <div>
                    <p><b>{comment.title}</b> <br />
                    <span className="reviewer">Review by {comment.reviewer}</span> <br />
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
                    <p><b>{comment.title}</b> <br />
                    <span className="reviewer">Review by {comment.reviewer}</span> <br />
                    </p>
                    <p className="comment">{comment.comment}</p>
                    <hr></hr>
                    </div>
                );
            })}
        </div>
        <div className="footer_corner">
            <p className="readmore" onClick={() => setReadMore(!readmore)}>All Reviews</p>
        </div>
    </div>
  );
}

export default BookDetailPage;

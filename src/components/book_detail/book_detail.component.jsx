import NavScrollExample from "../navbar/navbar.component";
import Footer from "../footer/footer.component";
import "./book_detail.styles.css";

import IonicPenAPI from "../../IonicPenAPI";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Book_Detail() {
  const bookData = {
    cover_image: "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_1.jpeg",
    book_title: "A Million To One",
    author: "EatMyBroccaili",
    categories: ["Mystery", "Adventure"],
    age: "Rated Teen (13+)",
    wordcount: "15,000",
    chapters: ["", "", "", "", "", "", ""],
    likes: new Array(490),
    reviews: [
      {title:"A MUST Read", reviewer:"Darger2344", comment:"I'm literally obsessed with this story?! I have never read anything like this before and I am so hooked. If anyone is having a hard time trying to decide. I'd say go for it!"},
      {title:"Written like a toddler", reviewer:"greengoddessstraderJOES", comment:"Look, I read a lot. I read hours and hours everyday. I know what good writting looks...."}
    ]
  }

  let { book_id } = useParams();
  const [book, setBook] = useState(bookData);

  useEffect(() => {
    IonicPenAPI.getBookDetails(book_id).then((response) => {
        if (response) {
          response['categories'] = ["Mystery", "Adventure"];
          response['age'] = "Rated Teen (13+)";
          response['wordcount'] = "15,000";
          setBook(response);
        } else {
          setBook(bookData);
        }
    });
  }, [] );

  return (
    <div>
        <NavScrollExample/>
        <div className="top">
            <div className="left"> 
                <img
                        className="recently-updated-cover-image"
                        src={book.cover_image}
                        width="100"
                        height="180"
                    />
                <p className="read">Start Reading</p>
            </div>
            <div className="header_corner">
                ♡
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
                <p>What a way to start a new school year! Jennifer discovers that there's a serial killer that attends her school as a student. The serial killer then starts to leave clues in her locker. Confused and scared, she's now trapped in a mystery that she never wanted to be a part of.</p>
            </div>
        </div>
        <div>
            <p>Reviews ({book.reviews.length})</p>
            {book.reviews.map((comment) => {
                return (
                    <div>
                    <p><b>{comment.title}</b> <br />
                    Review by {comment.reviewer} <br />
                    </p>
                    <p>{comment.comment}</p>
                    </div>
                );
            })}
        </div>
        <div className="footer_corner">
            All Reviews
        </div>
    </div>
  );
}

export default Book_Detail;
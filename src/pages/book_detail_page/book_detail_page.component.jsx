import NavScrollExample from "../../components/navbar/navbar.component";
import React, {useState, useEffect} from "react";
import Session from "../../Session";
import IonicPenAPI from "../../IonicPenAPI";
import { useParams, Navigate } from "react-router-dom";
import "./book_detail_page.styles.css";

function BookDetailPage() {
  const bookData = {
    cover_image:
      "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_1.jpeg",
    book_title: "A Million To One",
    author: "EatMyBroccaili",
    categories: ["Mystery", "Adventure"],
    age: "Rated Teen (13+)",
    wordcount: "15,000",
    chapters: ["", "", "", "", "", "", ""],
    likes: new Array(490),
    synopsis: "What a way to start a new school year! Jennifer discovers that there's a serial killer that attends her school as a student. The serial killer then starts to leave clues in her locker. Confused and scared, she's now trapped in a mystery that she never wanted to be a part of.",
    reviews: [
      {
        title: "A MUST Read",
        reviewer: "Darger2344",
        comment:
          "I'm literally obsessed with this story?! I have never read anything like this before and I am so hooked. If anyone is having a hard time trying to decide. I'd say go for it!",
      },
      {
        title: "Written like a toddler",
        reviewer: "greengoddessstraderJOES",
        comment:
          "Look, I read a lot. I read hours and hours everyday. I know what good writting looks....",
      },
    ],
  };

  let { book_id } = useParams();
  const [book, setBook] = useState(bookData);
  const [readmore, setReadMore] = useState(false);

  const extraReviews = [
    {title:"More comment", reviewer:"someone", comment:"nothing to say"},
    {title:"The Good and the Not So Good", reviewer:"William L. Isley, Jr.", comment:"A good way to evaluate Harry Potter is to compare it to Tolkien’s Lord of the Rings trilogy. Taking into account the facts that Tolkien’s masterpiece is the standard for fantasy literature and that Rowling is writing a slightly different genre and for a different audience, Harry Potter holds up fairly well."},
    {title:"amazing book", reviewer:"John Jurasic", comment:"This book made me just swell in happiness inside it may be confusing to hear that but this book is just amazing if you read the first second third fourth fifth and the six this book is definitely for you I also love the end."},
    {title:"Love", reviewer:"Sam", comment:"My daughter and I loved reading the whole Harry Potter series together. She is 11 and we would read a book and then watch the coordinating movie. Great bonding time for us!"},
    {title:"The best book in the series!", reviewer:"R Zimmer", comment:"The final confrontation between Harry Potter, the Boy Who Lived, the Chosen One, the \"symbol of hope\" for both the Wizard and Muggle worlds, and Lord Voldemort, He Who Must Not Be Named, the nefarious leader of the Death Eaters and would-be ruler of all. Good versus Evil. Love versus Hate. The Seeker versus the Dark Lord."},
    {title:"Forever a Fan…", reviewer:"	Denise Ramos", comment:"From my teenage years to my years in uni in London… I’ll forever read and read and read over my HP books!"},
    {title:"amazing", reviewer:"Amelia Le", comment:"Still hate JK Rowling for killing off so many of my beloved characters"},
    {title:"Amazing!", reviewer:"April Sue Locklear", comment:"One of my favorites! You cry, you laugh and you feel all the excitement Harry goes through. I can't wait till I read it again."},
    {title:"What a wonderful ending", reviewer:"Tala Gilbert", comment:"As a 67 year old woman who has waited until recently to read this series, I am in no way disappointed. The final battle was almost more than I could handle. My heart was in my throat and tears were in my eyes as I watched Harry Potter face his greatest nemesis and overcome. I hated for this to end, yet good things always seem to, don't they. The movies are great, but the books are so much better. I will definitely be reading these again and enjoying them over and over again. Thank you, J K Rowling! I salute you for a tale of timeless wonder never to be duplicated by another."},
  ]

  useEffect(() => {
    IonicPenAPI.getBookDetails(book_id).then((response) => {
      if (response) {
        console.log(response);
        response["categories"] = ["Mystery", "Adventure"];
        response["age"] = "Rated Teen (13+)";
        response["wordcount"] = "15,000";
        for (let i=0; i<extraReviews.length; i++) {
          response["reviews"].push(extraReviews[i]);
        }
        setBook(response);
      } else {
        setBook(bookData);
      }
    });
  }, []);

  if (!Session.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

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

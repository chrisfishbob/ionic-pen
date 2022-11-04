import NavScrollExample from "../navbar/navbar.component";
import Footer from "../footer/footer.component";
import "./book_detail.styles.css";

function Book_Detail() {
  const url = "https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_1.jpeg";
  const title = "A Million To One";
  const writer = "EatMyBroccaili";
  const categories = ["Mystery", "Adventure"];
  const age = "Rated Teen (13+)";
  const wordcount = "15,000";
  const chapters = "7";
  const likes = "490";
  const reviews = "24";
  const review_comments = [
    {title:"A MUST Read", reviewer:"Darger2344", comment:"I'm literally obsessed with this story?! I have never read anything like this before and I am so hooked. If anyone is having a hard time trying to decide. I'd say go for it!"},
    {title:"Written like a toddler", reviewer:"greengoddessstraderJOES", comment:"Look, I read a lot. I read hours and hours everyday. I know what good writting looks...."}
  ];

  return (
    <div>
        <NavScrollExample/>
        <div className="top">
            <div className="left"> 
                <img
                        className="recently-updated-cover-image"
                        src={url}
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
                    <b>{title}</b>
                    <br />
                    <i>by {writer}</i>
                </p>
                <p>
                    {categories.join(", ")} <br />
                    {age} <br />
                    {wordcount} Words; {chapters} Chapters; {likes} Likes<br />
                    <span className="review">Reviews ({reviews})</span>
                </p>
                <p>What a way to start a new school year! Jennifer discovers that there's a serial killer that attends her school as a student. The serial killer then starts to leave clues in her locker. Confused and scared, she's now trapped in a mystery that she never wanted to be a part of.</p>
            </div>
        </div>
        <div>
            <p>Reviews ({reviews})</p>
            {review_comments.map((comment) => {
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

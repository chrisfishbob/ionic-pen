import "./grey.bubble.styles.css";
import { Link } from "react-router-dom";
function GreyBubble() {
  let one = 1;
  return (
    <div>
      {/* <h4 className="welcome-text"> Welcome PrincessOfStory</h4> */}
      <div className="grey-bubble-container">
        <div className="book-image-container">
          <Link to="/book-details">
            <img
              className="book-image"
              src="https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_8.png"
            />
          </Link>
        </div>
        <div className="book-title-container">
          <h4 className="book-title">The Suitcase Switch</h4>
        </div>
        <div className="new-info-container">
          {/* We use a inner container here so that it's easy to space the items */}
          <div className="new-info-inner-container">
            <h5 className="info-content">New Readers: {one}</h5>
            <h5 className="info-content">New Reviews: 2</h5>
            <h5 className="info-content">New Likes: 3</h5>
          </div>
        </div>

        <div className="total-info-container">
          <div className="total-info-inner-container">
            <h5 className="info-content">Total Readers: 1</h5>
            <h5 className="info-content">Total Reviews: 2</h5>
            <h5 className="info-content">Total Likes: 3</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreyBubble;

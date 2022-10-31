import "./grey.bubble.styles.css";
function GreyBubble() {
    let one = 1;
  return (
    <div>
      <h4 className="welcome-text"> Welcome PrincessOfStory</h4>
      <div className="grey-bubble-container">
        <div className="div1">
          <img
            className="book-image"
            src="https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_8.png"
          />
        </div>
        <div className="div2">
          <h4 className="book-title">The Suitcase Switch</h4>
        </div>
        <div className="div3">
          <h5 className="info-content">New Readers: {one}</h5>
          <h5 className="info-content">New Reviews: 2</h5>
          <h5 className="info-content">New Likes: 3</h5>
        </div>

        <div className="div4">
          <h5 className="info-content">Total Readers: 1</h5>
          <h5 className="info-content">Total Reviews: 2</h5>
          <h5 className="info-content">Total Likes: 3</h5>
        </div>
      </div>
    </div>
  );
}

export default GreyBubble;

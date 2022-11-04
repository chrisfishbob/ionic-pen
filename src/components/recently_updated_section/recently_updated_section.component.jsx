import "./recently_updated_sections.styles.css";
import { Link } from "react-router-dom";

function RecentlyUpdatedSection(props) {
  return (
    <div className="recently-updated-container">
      <h1 className="recently-updated-text">Recently Updated</h1>
      <div className="images-container">
        {
          props.books.map((book) => {
            return (
              <Link to={`/book/${book.book_id}`} key={book.book_id}>
                <img
                  className="recently-updated-cover-image"
                  src={book.cover_image}
                  width="100"
                  height="180"
                />
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}

export default RecentlyUpdatedSection;

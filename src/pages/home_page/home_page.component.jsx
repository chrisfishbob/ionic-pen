import BooksCarousel from "../../components/books_carousel/books_carousel.component";
import GreyBubble from "../../components/grey_bubble/grey.bubble.component";

import { useState, useEffect } from "react";

import IonicPenAPI from "../../IonicPenAPI";

import "./home_page.styles.css";

function HomePage() {
  const [profile, setProfile] = useState({});
  const [library, setLibrary] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    IonicPenAPI.getHomepage().then((response) => {
      if (response && response.data) {
        if (response.data.profile) {
          setProfile(response.data.profile);
        }
        if (response.data.library) {
          setLibrary(response.data.library);
        }
        if (response.data.books) {
          setBooks(response.data.books);
        }
      }
    });
  }, []);

  return (
    <div>
      { profile.username && <h4 className="welcome-text"> Welcome { profile.username } </h4> }
      <GreyBubble />
      { library.length > 0 && <div>
          <h1 className="carousel-text">Library</h1>
          <BooksCarousel books={ library } />
        </div> 
      }
      <h1 className="carousel-text">All Books</h1>
      <BooksCarousel books={ books } />
    </div>
  );
}

export default HomePage;

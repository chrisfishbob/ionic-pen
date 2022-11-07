import NavScrollExample from "../navbar/navbar.component";
import Footer from "../footer/footer.component";
import GreyBubble from "../grey_bubble/grey.bubble.component";
import IonicPenAPI from "../../IonicPenAPI";
import ControlledCarousel from "../carousel/carousel.component";
import { useState, useEffect } from "react";
import Session from "../../Session";
import { Navigate } from "react-router-dom";
import "./home.styles.css";

function Home() {
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

  if (!Session.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavScrollExample />
      <h4 className="welcome-text"> Welcome {profile.username} </h4>
      <GreyBubble />
      <h1 className="carousel-text">Libray</h1>
      <div className="carousel-container">
        <ControlledCarousel books={books}/>
      </div>

      <h1 className="carousel-text">All Books</h1>
      <div className="carousel-container">
        <ControlledCarousel books={books}/>
      </div>
      {/* <RecentlyUpdatedSection books={books}/>
            <PopularSection/> */}
      <Footer />
    </div>
  );
}

export default Home;

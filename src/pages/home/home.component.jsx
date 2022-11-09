import NavBar from "../../components/navbar/navbar.component";
import Footer from "../../components/footer/footer.component";
import GreyBubble from "../../components/grey_bubble/grey.bubble.component";
import IonicPenAPI from "../../IonicPenAPI";
import ControlledCarousel from "../../components/carousel/carousel.component";
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
      <NavBar />
      <h4 className="welcome-text"> Welcome {profile.username} </h4>
      <GreyBubble />
      <h1 className="carousel-text">Library</h1>
      <ControlledCarousel books={library} />
      <h1 className="carousel-text">All Books</h1>
      <ControlledCarousel books={books} />
      <Footer />
    </div>
  );
}

export default Home;

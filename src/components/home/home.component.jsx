import NavScrollExample from "../navbar/navbar.component";
import RecentlyUpdatedSection from "../recently_updated_section/recently_updated_section.component";
import PopularSection from "../popular_section/popular_section.component";
import Footer from "../footer/footer.component";
import GreyBubble from "../grey_bubble/grey.bubble.component";
import IonicPenAPI from "../../IonicPenAPI";

import { useState, useEffect } from "react";
import Session from "../../Session";
import { Navigate } from "react-router-dom";

function Home() {
    const [profile, setProfile] = useState({});
    const [library, setLibrary] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        IonicPenAPI.getHomepage().then((response) => {
            if (response && response.data) {
                if (response.data.profile){
                    setProfile(response.data.profile);
                }
                if (response.data.library){
                    setLibrary(response.data.library);
                }
                if (response.data.books) {
                    setBooks(response.data.books);
                }
            }
        });
    }, [] );

    if (!Session.isLoggedIn()) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <NavScrollExample/>
            <h4 className="welcome-text"> Welcome {profile.username} </h4>
            <GreyBubble/>
            <RecentlyUpdatedSection books={books}/>
            <PopularSection/>
            <Footer/>
        </div>
    )
}

export default Home;
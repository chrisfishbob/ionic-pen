import NavScrollExample from "../navbar/navbar.component";
import RecentlyUpdatedSection from "../recently_updated_section/recently_updated_section.component";
import PopularSection from "../popular_section/popular_section.component";
import Footer from "../footer/footer.component";
import GreyBubble from "../grey_bubble/grey.bubble.component";
import IonicPenAPI from "../../IonicPenAPI";

import { useState, useEffect } from "react";

function Home() {
    const [profile, setProfile] = useState({});
    const [library, setLibrary] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        IonicPenAPI.getHomepage().then((response) => {
            if (response) {
                setProfile(response.data.profile);
                setLibrary(response.data.library);
                setBooks(response.data.books);
            }
        });
    }, [] );

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
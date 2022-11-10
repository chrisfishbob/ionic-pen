import NavBar from "../../components/navbar/navbar.component";
import Footer from "../../components/footer/footer.component";

import IonicPenAPI from "../../IonicPenAPI";

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ControlledCarousel from "../../components/carousel/carousel.component";
import "./search.styles.css";

function SearchPage() {
    const [searchResponse, setSearchResponse] = useState({
        users: [],
        books: []
    });
    let { search } = useLocation();

    const urlParams = new URLSearchParams(search);
    const searchQuery = urlParams.get('q');
    useEffect(() => {
        IonicPenAPI.search(searchQuery).then((response) => {
            setSearchResponse(response);
        });
    });
    return (
        <div>
          <NavBar />
            { searchResponse.users.length > 0 && 
                <div className="search-container">
                    <h1 className="carousel-text"> Users </h1>
                    <h3 className="carousel-text"> 
                        {searchResponse.users.map((user) => {
                            return user.username
                        })}
                    </h3>
                </div>
            }
            { searchResponse.books.length > 0 &&
                <div className="search-container">
                    <h1 className="carousel-text"> Books </h1>
                    <ControlledCarousel books={searchResponse.books} />
                </div>
            }
          <Footer />
        </div>
    );
}

export default SearchPage;
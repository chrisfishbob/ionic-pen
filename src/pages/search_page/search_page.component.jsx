
import BooksCarousel from "../../components/books_carousel/books_carousel.component";
import PageCarousel from "../../components/page_carousel/page_carousel.component";
import Card from "react-bootstrap/Card";

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

import IonicPenAPI from "../../IonicPenAPI";

import "./search_page.styles.css";
import { Link } from "react-router-dom";


function generateUsersCarouselObjects(users) {
  return users.map((user) => {
    return {
        isDummy: false,
        html:  <Link to={`/profile/${user.username}`} style={{textDecoration: 'none', color: 'black'}}>
                <Card>
                <Card.Img variant="top" src="https://ionic-pen-public-assets.s3.amazonaws.com/profile.jpeg" />
                    <Card.Body>{user.username}
                </Card.Body>
            </Card>
        </Link>
    };
  });
}

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
            setSearchResponse({
                users: generateUsersCarouselObjects(response.users),
                books: response.books
            });
        });
    }, [searchQuery]);
    return (
        <div>
            { searchResponse.users.length > 0 && 
                <div className="search-container">
                    <h1 className="carousel-text"> Users </h1>
                    <PageCarousel data={ searchResponse.users } 
                        filler={ <div className="fixed-box"></div> } />
                </div>
            }
            { searchResponse.books.length > 0 &&
                <div className="search-container">
                    <h1 className="carousel-text"> Books </h1>
                    <BooksCarousel books={searchResponse.books} />
                </div>
            }
        </div>
    );
}

export default SearchPage;
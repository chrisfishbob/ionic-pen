import NavBar from "../../components/navbar/navbar.component";
import Footer from "../../components/footer/footer.component";

import IonicPenAPI from "../../IonicPenAPI";

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Card } from "react-bootstrap";
import PageCarousel from "../../components/page-carousel/page_carousel.component";
import BooksCarousel from "../../components/books_carousel/books_carousel.component";
import "./search.styles.css";


function generateUsersCarouselObjects(users) {
    return users.map((user) => {
        return {
            isDummy: false,
            html:  <Card>
                <Card.Img variant="top" src="https://ionic-pen-public-assets.s3.amazonaws.com/profile.jpeg" />
                    <Card.Body>{user.username}
                </Card.Body>
            </Card>
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
            console.log(response);
            setSearchResponse({
                users: generateUsersCarouselObjects(response.users),
                books: response.books
            });
        });
    }, []);
    return (
        <div>
          <NavBar />
            { searchResponse.users.length > 0 && 
                <div className="search-container">
                    <h1 className="carousel-text"> Users </h1>
                    <PageCarousel data={searchResponse.users} 
                        filler={<div className="fixed-box"></div>} />
                </div>
            }
            { searchResponse.books.length > 0 &&
                <div className="search-container">
                    <h1 className="carousel-text"> Books </h1>
                    <BooksCarousel books={searchResponse.books} />
                </div>
            }
          <Footer />
        </div>
    );
}

export default SearchPage;
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import IonicPenAPI from "../../IonicPenAPI";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

function redirectToRandomBook() {
  IonicPenAPI.getRandomBook().then((res) => {
    window.location.href = `/books/info/${res.book_id}`;
  });
}

function NavBar(props) {
  const [query, setQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const location = useLocation();

  async function performSearch(e) {
    e.preventDefault();
    try {
      navigate(`/search?q=${query}`);
      if (location.pathname === "/search") {
        navigate(0);
      }
    } catch (err) {
      console.log(err);
    }
    setQuery("");
  }

  return (
    <Navbar bg="light" expand="sm" style={{ position: "sticky", top: "0" }}>
      <Container fluid>
        <Button variant="outline-*" size="sm" color="#0d6efd">
          <Link to="/">
            <Image
              src="https://ionic-pen-public-assets.s3.amazonaws.com/logo.png"
              width="50"
              height="50"
            />
          </Link>
        </Button>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/books">
              <Nav.Link>Catalog</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex" onSubmit={performSearch}>
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={({ target: { value } }) => setQuery(value)}
              value={query || ""}
            />
            <p>&nbsp;&nbsp;</p>

            <Button
              variant="success"
              size="sm"
              onClick={() => redirectToRandomBook()}
            >
              Pick&nbsp;For&nbsp;Me
            </Button>

            <p>&nbsp;&nbsp;</p>
            <Dropdown
              show={showProfile}
              onMouseEnter={() => {
                setShowProfile(true);
              }}
              onMouseLeave={() => {
                setShowProfile(false);
              }}
            >
              <Button variant="outline-*" size="sm" href="/profile">
                <Image
                  src="https://ionic-pen-public-assets.s3.amazonaws.com/profile.jpeg"
                  width="40"
                  height="40"
                  roundedCircle
                  border="0"
                />
              </Button>
              <Dropdown.Menu
                show={showProfile}
                style={{ left: "-6em", top: "3em" }}
              >
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                {props.loggedIn ? (
                  <div>
                    <Dropdown.Item href="/books/new">New Book</Dropdown.Item>
                    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                  </div>
                ) : (
                  <div>
                    <Dropdown.Item href="/login">Login</Dropdown.Item>
                    <Dropdown.Item href="/login">Sign Up</Dropdown.Item>
                  </div>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

import IonicPenAPI from "../../IonicPenAPI";

let BASE_URL = "127.0.0.1:3200";

function NavScrollExample() {
  const [value, setValue] = useState("");
  const onInput = ({ target: { value } }) => setValue(value);
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await IonicPenAPI.search(value);
      // const response = await axios.get(
      //   `http://${BASE_URL}/api/search?q=${value}`
      // );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setValue("");
  }

  return (
    <Navbar bg="light" expand="sm">
      <Container fluid>
        <Button variant="outline-*" size="sm" color="#0d6efd">
          <Image
            src="https://ionic-pen-public-assets.s3.amazonaws.com/logo.png"
            width="50"
            height="50"
          />
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

            <LinkContainer to="/catalog">
              <Nav.Link>Catalog</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form className="d-flex" onSubmit={onFormSubmit}>
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={onInput}
              value={value || ""}
            />
            <p>&nbsp;&nbsp;</p>

            <Button variant="success" size="sm">
              Pick&nbsp;For&nbsp;Me
            </Button>

            <p>&nbsp;&nbsp;</p>

            <Button variant="outline-*" size="sm">
              <Image
                src="https://ionic-pen-public-assets.s3.amazonaws.com/profile.jpeg"
                width="40"
                height="40"
                roundedCircle
                border="0"
              />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

function NavScrollExample() {
  return (
    <Navbar bg="light" expand="sm">
      <Container fluid>
        <Button variant="outline-*" size="sm">
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
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Catalog</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <p>&nbsp;&nbsp;</p>
            <Button variant="outline-success" size="sm">
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

import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import IonicPenAPI from "../../IonicPenAPI";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./profile_page.styles.css";


function ProfileInfoPage() {
  return (
    <div>
      
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [sectionInd, setSelectionInd] = useState(1)
  const booksPerPage = [{isDummy: true}];

  useEffect(() => {
    IonicPenAPI.getProfile(username? username: null).then((res) => {
      setProfile(res);
      console.log(res);
    });
  }, [username]);

  return <div style={{ marginLeft:"19%", marginTop: "2%", marginBottom: "2%", marginRight: "19%"}}>
    <h1> { profile.username }</h1>
    <h6> im gonna die in here pls </h6>
    <Row> 
      <Col xs lg={3}>
        <Row>
          <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"12em", height: "3em"}}
            variant="outline-primary" onClick={()=>setSelectionInd(0)}> Account </Button>
        </Row>
        <br></br>
        <Row>
          <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"12em", height: "3em"}}
            variant="outline-primary" onClick={()=>setSelectionInd(1)}> Manage Stories </Button>
        </Row>
        <br></br>
        <Row>
          <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"12em", height: "3em"}}
            variant="outline-primary" onClick={()=>setSelectionInd(2)}> Following </Button>
        </Row>
        <br></br>
        <Row>
          <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"12em", height: "3em"}}
            variant="outline-primary" onClick={()=>setSelectionInd(3)}> Favorites </Button>
        </Row>
      </Col>
      <Col>
        {sectionInd == 0 &&
          <div>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control placeholder="First Name" value={profile.first_name} disabled/>
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control placeholder="Last Name" value={profile.last_name} disabled/>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <Form.Label>Username</Form.Label>
                      <Form.Control placeholder="Username" value={profile.first_name} disabled/>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        }
        {sectionInd == 1 &&
          <div>
          <Row>
            <Col style={{marginLeft:"7em"}}>
              <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"10em"}}
                variant="outline-primary" onClick={() => navigate("/books/new/")}> Publish New Story </Button>
            </Col>
            <Col style={{marginLeft:"4em"}}>
              <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"10em"}}
                variant="outline-primary" onClick={()=>setSelectionInd(3)}> Update a story </Button>
            </Col>
          </Row>
          <Row>
            <center style={{marginTop:"3em"}}>
              Current Stories
            </center>
          </Row>
          <Row>
            <div>
                {booksPerPage.map((book) => {
                  if (book.isDummy)
                    return (<img
                        className="carousel-cover-image"
                        width="100"
                        height="180"
                        src="https://ionic-pen-public-assets.s3.amazonaws.com/book_cover_1.jpeg"
                      />);
                  return (<Link to={`/books/info/${book.book_id}`} key={book.book_id}>
                    <img
                      className="carousel-cover-image"
                      src={book.cover_image}
                      width="100"
                      height="180"
                    />
                  </Link>);
                })}
              </div>
          </Row>
          <Row>
            <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"12em", fontSize:"12px"}}
                variant="outline-primary" onClick={()=>setSelectionInd(3)}> Edit Story Details </Button>
          </Row>
          </div>
        }
        {sectionInd == 2 &&
          <div>
            Following
          </div>
        }
        {sectionInd == 3 &&
          <div>
            Favorites
          </div>
        }
      </Col>
    </Row>
    </div>
}

export default ProfilePage;
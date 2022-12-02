import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import IonicPenAPI from "../../IonicPenAPI";

import Session from "../../Session";
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./profile_page.styles.css";


function AccountInfo(props) {
  return <div>
    <Card>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="First Name" value={props.profile.first_name} disabled/>
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last Name" value={props.profile.last_name} disabled/>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Username" value={props.profile.username} disabled/>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  </div>
}



function BooksInfoList(props) {
  return <div style={{height: props.height? props.height: "400px", overflow: "scroll"}}>
    { props.books.map((book) => {
      return <Row style={{marginTop: "20px"}}>
        <Col style={{marginLeft: "50px"}}>
          <Link to={`/books/info/${book.book_id}`} key={book.book_id}>
            <img
              className="carousel-cover-image"
              src={book.cover_image}
              width="100"
              height="180"
            />
          </Link>
          { props.editable && 
            <Row>
              <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"12em", fontSize:"12px"}}
                variant="outline-primary" onClick={()=>props.navigate(`/books/edit/${book.book_id}`)}> Edit Story Details </Button>
            </Row>
          }
        </Col>
        <Col style={{marginLeft: "-200px"}}>
          <br></br>
          <h6><b>{book.book_title}</b></h6>
          {book.categories.join(", ")} <br />
          {book.age} <br />
          {book.wordcount} Words; {book.chapters.length} Chapters; {book.likes.length} Likes<br />
        </Col>
      </Row>
    })}
  </div>
}

function ManageStories(props) {
  return <div>
    <Row>
      <Col style={{marginLeft:"7em"}}>
        <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"10em"}}
          variant="outline-primary" onClick={() => props.navigate("/books/new/")}> Publish New Story </Button>
      </Col>
      <Col style={{marginLeft:"4em"}}>
        <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"10em"}}
          variant="outline-primary" onClick={()=>console.log('todo')}> Update a story </Button>
      </Col>
    </Row>
    <Row>
      <center style={{marginTop:"3em"}}>
        <h5>
          <b>
            Published Stories
          </b>
        </h5>
      </center>
      <br></br>
    </Row>
    <Row>
      <BooksInfoList books={props.userBooks} editable={props.editable} navigate={props.navigate} />
    </Row>
  </div>
}

function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [sectionInd, setSelectionInd] = useState(1)
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    IonicPenAPI.getProfile(username).then((profileObj) => {
      setProfile(profileObj);
      IonicPenAPI.getAllBooks().then((res) => {
        let books = res.books.filter(book => book.author === profileObj.username)
        setUserBooks(books)
      });
    });
  }, [username]);

  if (username ) {
    return <div style={{ marginLeft:"19%", marginTop: "2%", marginBottom: "2%", marginRight: "19%"}}> 
        <h4><b> Books authored by { profile.username } </b></h4>
        <BooksInfoList books={userBooks} editable={false} height="600px" />
      </div>
  }

  if (!Session.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return <div style={{ marginLeft:"19%", marginTop: "2%", marginBottom: "2%", marginRight: "19%"}}>
    <h1> { profile.username }</h1>
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
        {sectionInd === 0 &&
          <AccountInfo profile={profile} />
        }
        {sectionInd === 1 &&
          <ManageStories navigate={navigate} userBooks={userBooks} editable={true} />
        }
        {sectionInd === 2 &&
          <div>
            <BooksInfoList books={userBooks} editable={false} height="600px" />
          </div>
        }
        {sectionInd === 3 &&
          <div>
            <BooksInfoList books={userBooks} editable={false} height="600px" />
          </div>
        }
      </Col>
    </Row>
  </div>
}

export default ProfilePage;
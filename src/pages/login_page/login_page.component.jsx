import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import IonicPenAPI from "../../IonicPenAPI";
import Session from "../../Session";

import "./login_page.styles.css";

function LoginPage(props) {
  const navigate = useNavigate();

  const login_form = {
    username: "",
    password: "",
  };

  const [errorText, setErrorText] = useState("");
  const [form, setForm] = useState(login_form);

  function onFieldInput(field, { target: { value } }) {
    let updatedForm = {...form};
    updatedForm[field] = value;
    setForm(updatedForm);
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      IonicPenAPI.login(form.username, form.password).then((res) => {
        setForm({
          username: "",
          password: "",
        });
        if (res) {
          props.setLoginStatus(true);
          navigate("/");
        }
      }).catch((err) => {
        setErrorText(err.message);
      });
    } catch (err) {
      console.log(err);
    } 
  }

  if (Session.isLoggedIn()) {
    return <Navigate to="/" />;
  }
  
  return (
    <Container>
      <Row style={{ height: "100vh", 'margin-top': '5%' }}>
        <Col></Col>
        <Col>
          { errorText && 
            <Alert key="login-error" variant="danger">
              { errorText }
            </Alert>
          }
          <Card className="login-card">
            <br></br>
            <Card.Title className="login-text"> LOGIN </Card.Title>
            <Card.Body>
              <Form onSubmit={ onFormSubmit }>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="email/username"
                    onChange={(event) => { onFieldInput("username", event) }}
                    value={form.username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    className="input-field"
                    type="password"
                    placeholder="password"
                    onChange={(event) => { onFieldInput("password", event) }}
                    value={form.password}
                  />
                </Form.Group>
                <center>
                  <Button variant="primary" type="submit" align-self="center">
                    Login
                  </Button>
                </center>
              </Form>
            </Card.Body>
          </Card>
          <div>
            <br></br>
            <center>
              Don't have an account? <a href="/signup" style={{'text-decoration': 'none'}}>Sign Up</a> here!
            </center>
          </div>
          <center> 
            <Image
             src="./jump-roping.ico"
            />  
          </center>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

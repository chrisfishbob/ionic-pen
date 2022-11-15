import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import IonicPenAPI from "../../IonicPenAPI";
import Session from "../../Session";

import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./sign_up_page.styles.css";

function SignUpPage(props) {
  const navigate = useNavigate();

  const sign_up_form = {
    username: "",
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    verify_password: ""
  };

  const [form, setForm] = useState(sign_up_form);
  const [errorText, setErrorText] = useState("");

  function onFieldInput(field, { target: { value } }) {
    let updatedForm = {...form};
    updatedForm[field] = value;
    setForm(updatedForm);
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    try {
      if (!form.first_name) {
        setErrorText("First name cannot be empty");
        return;
      }
      if (!form.email_id) {
        setErrorText("Email name cannot be emtpy");
        return;
      }
      if (!form.username) {
        setErrorText("Username cannot be empty");
        return;
      }
      if (form.password !== form.verify_password) {
        setErrorText("Passwords must match");
        return;
      }
      IonicPenAPI.signup(form.username, form.first_name, form.last_name, 
          form.email_id, form.password).then((res) => {
        setForm(sign_up_form);
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
            <Card.Title className="login-text"> SIGN UP </Card.Title>
            <Card.Body>
              <Form onSubmit={ onFormSubmit }>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        placeholder="First name"
                        onChange={ (event) => { onFieldInput("first_name", event) }}
                        value={ form.first_name }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        placeholder="Last name"
                        onChange={ (event) => { onFieldInput("last_name", event) }}
                        value={ form.last_name }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicEmailID">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Email ID"
                    onChange={ (event) => { onFieldInput("email_id", event) }}
                    value={ form.email_id }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Username"
                    onChange={ (event) => { onFieldInput("username", event) }}
                    value={ form.username }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    onChange={ (event) => { onFieldInput("password", event) }}
                    value={ form.password }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicVerifyPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={ (event) => { onFieldInput("verify_password", event) }}
                    value={ form.verify_password }
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div>
            <center>
              Already have an account? <a href="/login" style={{'text-decoration': 'none'}}>Login</a> here!
            </center>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;

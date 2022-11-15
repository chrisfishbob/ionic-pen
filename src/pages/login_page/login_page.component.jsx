import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import IonicPenAPI from "../../IonicPenAPI";
import Session from "../../Session";

import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./login_page.styles.css";

function LoginPage(props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function onUsernameInput({ target: { value } }) {
    setForm({
      username: value,
      password: form.password,
    });
  }

  function onPasswordInput({ target: { value } }) {
    setForm({
      username: form.username,
      password: value,
    });
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
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  if (Session.isLoggedIn()) {
    return <Navigate to="/" />;
  }
  
  let mt = [0, 0, 0, 0, 0, 0];
  return (
    <Container>
      {mt.map(() => {
        return <br></br>;
      })}
      <Row style={{ height: "100vh" }}>
        <Col></Col>
        <Col>
          <Card className="login-card">
            <Card.Title className="login-text"> LOGIN </Card.Title>
            <Card.Body>
              <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="email/username"
                    onChange={onUsernameInput}
                    value={form.username}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    className="input-field"
                    type="password"
                    placeholder="password"
                    onChange={onPasswordInput}
                    value={form.password}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

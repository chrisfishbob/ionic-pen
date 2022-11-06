import NavScrollExample from "../navbar/navbar.component";
import IonicPenAPI from "../../IonicPenAPI";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from "react";
import Session from "../../Session";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    function onUsernameInput({ target: { value }}) {
        setForm({
            username: value,
            password: form.password
        });
    }

    function onPasswordInput({ target: { value }}) {
        setForm({
            username: form.username,
            password: value
        });
    }

    async function onFormSubmit(event) {
        event.preventDefault();
        try {
            IonicPenAPI.login(form.username, form.password).then((res) => {
                if (res) {
                    navigate("/");
                }
            })
        } catch (error) {
            console.log(error);
        }
        setForm({
            username: "",
            password: ""
        });
    }

    if (Session.isLoggedIn()) {
        return <Navigate to="/" />;
    }


    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control type="text" placeholder="username" onChange={onUsernameInput} value={form.username}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="password" onChange={onPasswordInput} value={form.password}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}



export default Login;
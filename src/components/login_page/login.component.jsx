import NavScrollExample from "../navbar/navbar.component";
import IonicPenAPI from "../../IonicPenAPI";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from "react";

function Login() {
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
            const response = await IonicPenAPI.login(form.username, form.password);
        } catch (error) {
            console.log(error);
        }
        setForm({
            username: "",
            password: ""
        });
    }


    return (
        <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control type="text" placeholder="username" onChange={onUsernameInput} value={form.username}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="password" onChange={onPasswordInput} value={form.password}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}



export default Login;
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form } from 'react-bootstrap';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        axios.post("/user/login", {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            console.log(response)
            if(response.status === 200) {
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                })
                this.setState({
                    redirectTo: "/"
                })
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        if(this.state.redirectTo){
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="input" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            )
        }
    }
}
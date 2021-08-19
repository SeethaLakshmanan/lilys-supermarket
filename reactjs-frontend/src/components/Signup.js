import React from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/styleSettings.css";
import { Link, withRouter } from "react-router-dom";

/*
    This React component handles the registration/signup functionalities
*/
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errMsgFirst: "",
            errMsgLast: "",
            errMsgEmail: "",
            errMsgPwd: "",
            errMsg: "",
        };
    }

    /*
        This function validates the first name field against the given Regex 
    */
    validateFirstName(firstName) {
        if (!firstName) {
            this.setState({
                errMsgFirst: "Please enter a first name",
            });
            return false;
        } else {
            var reg = new RegExp("[-a-zA-ZäöüÄÖÜß]*");
            var isValid = firstName.match(reg);
            if (isValid) {
                return true;
            } else {
                this.setState({
                    errMsgFirst: "First name is not valid",
                });
                return false;
            }
        }
    }

    /*
        This function validates the last name field against the given Regex 
    */
    validateLastName(lastName) {
        if (!lastName) {
            this.setState({
                errMsgLast: "Please enter a last name",
            });
            return false;
        } else {
            var reg = new RegExp("[-a-zA-ZäöüÄÖÜß]*");
            var isValid = lastName.match(reg);
            if (isValid) {
                return true;
            } else {
                this.setState({
                    errMsgLast: "Last name is not valid",
                });
                return false;
            }
        }
    }

    /*
        This function validates the email field against the given Regex 
    */
    validateEmail(email) {
        if (!email) {
            this.setState({
                errMsgEmail: "Please enter an email address",
            });
            return false;
        } else {
            // validate regex
            var expPart1 =
                "(?:[a-z0-9!#%&'*+/=?_`{|}~-]+(?:.[a-z0-9!#%&'*+/=?_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@";

            var expPart2 =
                "(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[" +
                "(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])).){3}(?:(2(5[0-5]|[0-4][0-9])|" +
                "1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|" +
                "\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])";

            var reg = new RegExp(expPart1 + expPart2);
            var isValid = email.match(reg);
            if (isValid) {
                return true;
            } else {
                this.setState({
                    errMsgEmail: "Email address is not valid",
                });
                return false;
            }
        }
    }

    /*
        This function validates the password field against the given Regex 
    */
    validatePassword(password) {
        if (!password) {
            this.setState({
                errMsgPwd: "Please enter a password",
            });
            return false;
        } else {
            var reg =
                "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\\s)(?=.*[-!$%^&*()_+|~=`{}\\[\\]:\";'<>?,./]).{8,32}";

            var isValid = password.match(reg);
            if (isValid) {
                return true;
            } else {
                this.setState({
                    errMsgPwd: "Password is not valid",
                });
                return false;
            }
        }
    }

    /*
        This is a helper function to validate firstname, lastname, 
        email and password fields
    */
    validateFields(firstName, lastName, email, password) {
        this.setState({
            errMsgFirst: "",
            errMsgLast: "",
            errMsgEmail: "",
            errMsgPwd: "",
        });

        var f = this.validateFirstName(firstName);
        var l = this.validateLastName(lastName);
        var e = this.validateEmail(email);
        var p = this.validatePassword(password);

        // returns true if all are true
        return f && l && e && p;
    }

    /*
        This function handles the navigation to login page if signup is successful
    */
    postSignup = (response) => {
        alert("Sign up complete, please login.");
        this.props.history.push("/login");
    };

    /*
        This function makes the signup request to the server 
    */
    signup(firstName, lastName, email, password) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            }),
        };
        fetch("http://127.0.0.1:8000/login_api/signup", requestOptions)
            .then((response) => response.json())
            .then(this.postSignup)
            .catch((err) => {
                console.log("Error: " + err);
                this.setState({
                    errMsg: "Server not available",
                });
            });
    }

    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    /*
        This is a handler function for the signup button click
    */
    onSignUpHandler = () => {
        let { firstName, lastName, email, password } = this.state;
        var areFieldsValidated = this.validateFields(firstName, lastName, email, password);

        if (areFieldsValidated) {
            this.signup(firstName, lastName, email, password);
        } else {
            console.log("fields are not validated");
        }
    };

    render() {
        return (
            <div>
                <div style={{ marginLeft: 725, marginTop: 10 }}>
                    {/* This button can be replaced with a logo */}
                    <Link to="/">
                        <Button node="button" waves="light">
                            Home
                        </Button>
                    </Link>
                </div>
                <div className="box-border-signup common">
                    <h4>Sign up</h4>
                    <Form className="containers">
                        <Form.Group>
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.onChangehandler}
                            />
                            <span className="text-danger">{this.state.errMsgFirst}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.onChangehandler}
                            />
                            <span className="text-danger">{this.state.errMsgLast}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email id</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangehandler}
                            />
                            <span className="text-danger">{this.state.errMsgEmail}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangehandler}
                            />
                            <span className="text-danger">{this.state.errMsgPwd}</span>
                        </Form.Group>
                        <p className="text-danger">{this.state.errMsg}</p>
                        <Button
                            className="text-center mb-4"
                            color="success"
                            onClick={this.onSignUpHandler}
                        >
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(Signup);

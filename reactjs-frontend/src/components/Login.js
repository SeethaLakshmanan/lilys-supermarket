import React from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/styleSettings.css";
import { Redirect } from "react-router";
import { RouteAuth } from "./Navbar";
import { Link } from "react-router-dom";

/*
    This React component handles the login functionalities
*/
class Login extends React.Component {
    _isMounted = false;
    _loggedToken = "";
    _username = "";
    _userId;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errMsgEmail: "",
            errMsgPwd: "",
            errMsg: "",
            shouldRedirect: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        This is a helper function to validate email and password fields
    */
    validateFields(email, password) {
        this.setState({
            errMsgEmail: "",
            errMsgPwd: "",
        });

        var e = this.validateEmail(email);
        var p = this.validatePassword(password);

        // returns true if both are true
        return e && p;
    }

    /*
        This function handles the response from the server after the login request
        is made
    */
    loginResponseCheck = (data) => {
        if (this._isMounted) {
            if (data.token) {
                //check if login is success
                this._loggedToken = data.token;
                this._username = data.username;
                this._userId = data.userId;
            } else {
                //else og the error message from the API
                this.setState({
                    errMsg: data["non_field_errors"][0],
                });
            }

            if (this._loggedToken !== null && this._loggedToken !== "") {
                RouteAuth.authenticate(this._username, this._userId, () => {
                    this.setState({
                        shouldRedirect: true,
                    });
                });
            } else {
                console.log("Login token not available!");
            }
        }
    };

    /*
        This function makes the login request to the server 
    */
    login(email, password) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password: password }),
        };
        fetch("http://127.0.0.1:8000/login_api/login", requestOptions)
            .then((response) => response.json())
            .then(this.loginResponseCheck)
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
        This is a handler function for the login button click
    */
    onLoginHandler = () => {
        let { email, password } = this.state;
        var areFieldsValidated = this.validateFields(email, password);

        if (areFieldsValidated) {
            console.log("fields are validated");
            this.login(email, password);
        }
    };

    render() {
        const { shouldRedirect } = this.state;

        if (shouldRedirect === true) {
            return <Redirect to="/" />;
        }

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
                <div className="box-border-login common">
                    <h4>Login</h4>
                    <Form className="containers">
                        <Form.Group>
                            <Form.Label htmlFor="email" className="left">
                                Email id
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangehandler}
                            />
                            <span className="text-danger">{this.state.errMsgEmail}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password" className="left">
                                Password
                            </Form.Label>
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
                            onClick={this.onLoginHandler}
                        >
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;

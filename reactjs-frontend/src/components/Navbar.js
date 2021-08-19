import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import CustomButton from "./CustomButton";

// React functional component to display the navigation bar
const Navigationbar = () => {
    var history = useHistory();
    var location = useLocation();

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand>
                <Link to="/">
                    <CustomButton label="Lily's" />
                </Link>
            </Navbar.Brand>
            {location.pathname !== "/fruits" && location.pathname !== "/" ? (
                <Link to="/fruits">
                    <CustomButton label="Fruits" onClick={() => history.push("/fruits")} />
                </Link>
            ) : null}
            {location.pathname !== "/vegetables" && location.pathname !== "/" ? (
                <Link to="/vegetables">
                    <CustomButton label="Vegetables" onClick={() => history.push("/vegetables")} />
                </Link>
            ) : null}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {!checkAuth() ? (
                    <Nav>
                        <Link to="/login">
                            <CustomButton label="Login" />
                        </Link>

                        <Link to="/signup">
                            <CustomButton label="Signup" />
                        </Link>
                        <Link to="/cart">
                            <CustomButton label="Cart" />
                        </Link>
                    </Nav>
                ) : (
                    <Nav>
                        <NavDropdown
                            style={{
                                color: "black",
                                backgroundColor: "lightblue",
                                borderRadius: 5,
                                margin: 5,
                            }}
                            title={`Hello ${RouteAuth.username}`}
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item>
                                <CustomButton
                                    onClick={() => history.push("/orders")}
                                    label="Orders"
                                />
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <CustomButton
                                    onClick={() => RouteAuth.signout(() => history.push("/"))}
                                    label="Logout"
                                />
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/cart">
                            <CustomButton label="Cart" />
                        </Link>
                    </Nav>
                )}
            </Navbar.Collapse>{" "}
        </Navbar>
    );
};

const checkAuth = () => {
    return RouteAuth.isAuthenticated;
};

export default Navigationbar;

export const RouteAuth = {
    isAuthenticated: false,
    username: "",
    userId: -1,
    authenticate(username, userId, cb) {
        this.username = username;
        this.userId = userId;
        this.isAuthenticated = true;
        console.log("set authenticated");
        setTimeout(cb, 100);
    },
    signout(cb) {
        this.username = "";
        this.userId = -1;
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

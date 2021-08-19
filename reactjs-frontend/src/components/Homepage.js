import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFruits, getVeggies } from "../actionCreators/index";
import "../styles/styleSettings.css";
import Navbar from "./Navbar";

class Homepage extends Component {
    componentDidMount() {
        // load the data into redux store from server
        if (this.props.fruits.length === 0) this.props.getFruits();
        if (this.props.vegetables.length === 0) this.props.getVeggies();
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="box-border-img">
                    <Card>
                        <Card.Img width="100%" src="./fruits1.jpg" alt="Fruits" />
                        <Card.Body className="card-body">
                            <Card.Title>Fruits</Card.Title>
                            <Card.Text>Shop from a range of fresh fruits</Card.Text>
                            <Link to="/fruits">Go</Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="box-border-img">
                    <Card>
                        <Card.Img width="100%" src="./veggies1.jpg" alt="Vegetables" />
                        <Card.Body className="card-body">
                            <Card.Title>Vegetables</Card.Title>
                            <Card.Text>Shop from a range of fresh vegetables</Card.Text>
                            <Link to="/vegetables">Go</Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { fruits: state.fruits, vegetables: state.vegetables };
}

export default connect(mapStateToProps, { getFruits, getVeggies })(Homepage);

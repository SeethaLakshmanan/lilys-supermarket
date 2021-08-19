import React from "react";
import Homepage from "./components/Homepage";
import Products from "./components/Products";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Orders from "./components/Orders";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/fruits" component={Products} />
                    <Route exact path="/vegetables" component={Products} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/orders" component={Orders} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

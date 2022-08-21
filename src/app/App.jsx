import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import NavBar from "./components/navBar";
import Users from "./components/users";
import User from "./components/user";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/main" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId"
                    render={(props) => <User {...props} />}
                />
                <Route path="/users" component={Users} />
            </Switch>
        </>
    );
}

export default App;

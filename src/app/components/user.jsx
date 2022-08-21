import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
const User = ({ match, history }) => {
    const userId = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.default.getById(userId).then((data) => setUser(data));
    }, [user]);
    const handleGetAllusers = () => {
        history.push("/users");
    };
    if (user)
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings:{user.completedMeetings}</p>
                <h3>Rate:{user.rate}</h3>
                <button
                    onClick={() => {
                        handleGetAllusers();
                    }}
                >
                    {" "}
                    Все пользователи
                </button>
            </>
        );
    return <h1>loading...</h1>;
};

User.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default User;

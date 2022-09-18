import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onDelete,
    onToggleBookMark,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя " },
        qualities: {
            name: "Качества ",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия " },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз "
        },
        rate: { path: "rate", name: "Оценка " },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;

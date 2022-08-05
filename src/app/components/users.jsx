import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectProf, setSelectProf] = useState();
    const [professions, setProfessions] = useState();
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectProf]);
    const handleProfessionSelect = (item) => {
        setSelectProf(item);
    };
    const filteredUsers = selectProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) === JSON.stringify(selectProf)
          )
        : users;
    if (filteredUsers) {
        const count = filteredUsers.length;
        const userCrop = paginate(filteredUsers, currentPage, pageSize);
        const handleClearFilter = () => {
            setSelectProf();
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={handleClearFilter}
                        >
                            {" "}
                            очистить{" "}
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />

                    {count > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Качества</th>
                                    <th scope="col">Провфессия</th>
                                    <th scope="col">Встретился, раз</th>
                                    <th scope="col">Оценка</th>
                                    <th scope="col">Избранное</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {userCrop.map((user) => (
                                    <User key={user._id} {...rest} {...user} />
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;

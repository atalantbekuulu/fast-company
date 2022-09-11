import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";
import SearchForm from "./searchForm";

const UsersList = () => {
    const pageSize = 8;
    const [dataInputValue, setDataInputValue] = useState("");
    const [users, setUsers] = useState();
    const [usersBase, setTest] = useState();
    useEffect(() => {
        api.users.default.fetchAll().then((data) => setTest(data));
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const data = { userName: "" };
        setDataInputValue(e.target.value);
        data.userName = e.target.value;
        getFilterUser(data);
    };

    const getFilterUser = (data) => {
        const newFilteredUsers = usersBase.filter((user) => {
            return user.name
                .toLowerCase()
                .includes(data.userName.toLowerCase());
        });
        setUsers(newFilteredUsers);
        setSelectProf();
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    useEffect(() => {
        api.users.default.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleToggleBookMark = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [selectProf, setSelectProf] = useState();
    const [professions, setProfessions] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
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
        setDataInputValue("");
        console.log(dataInputValue);
        setUsers(usersBase);
        setSelectProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectProf)
              )
            : users;
        if (filteredUsers) {
            const count = filteredUsers.length;
            const sortedUsers = _.orderBy(
                filteredUsers,
                [sortBy.path],
                [sortBy.order]
            );
            const userCrop = paginate(sortedUsers, currentPage, pageSize);
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
                                очистить
                            </button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStatus length={count} />
                        <SearchForm
                            dataInputValue={dataInputValue}
                            onChange={handleChange}
                        />
                        {count > 0 && (
                            <UsersTable
                                users={userCrop}
                                onSort={handleSort}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                                selectedSort={sortBy}
                            />
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
    }
    return <h1>loading...</h1>;
};

export default UsersList;

import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const Caret = () => {
        if (selectedSort.order === "asc") {
            return <i className="bi bi-caret-up-fill"></i>;
        } else if (selectedSort.order === "desc") {
            return <i className="bi bi-caret-down-fill"></i>;
        }
    };
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc",
                item: (selectedSort.item = item)
            });
        } else {
            onSort({
                ...selectedSort,
                path: item,
                order: selectedSort.order === "asc",
                item: (selectedSort.item = item)
            });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {columns[column].path === selectedSort.item
                            ? Caret()
                            : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object,
    columns: PropTypes.object.isRequired
};

export default TableHeader;

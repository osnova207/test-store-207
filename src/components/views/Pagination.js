import * as cn from "classnames";
import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ pageCount, currentPage, onChangePage }) => {
    const pageCountArr = [...Array(pageCount)].map((_, i) => ++i);

    const list = pageCountArr.map(item => (
        <div
            key={item}
            className={cn("pagination__item", {'pagination__item-active': item === currentPage})}
            onClick={() => onChangePage(item)}>
            {item}
        </div>
    ));

    return (
        <div className="pagination">
            {pageCount > 1 && list}
        </div>
    )
};

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
};

export default Pagination;
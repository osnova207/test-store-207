import React from "react";
import PropTypes from "prop-types";
import * as cn from "classnames";

const Pagination = ({ pageCount, perPage, currentPage, onChangePage, onChangePerPage }) => {
    const pageCountArr = [...Array(pageCount)].map((_, i) => ++i);

    const list = pageCountArr.map(item => (
        <div
            key={item}
            className={cn("Pagination__item", {'Pagination__item-active': item === currentPage})}
            onClick={() => onChangePage(item)}>
            {item}
        </div>
    ));

    return (
        <div className="Pagination">
            {pageCount > 1 &&
                <div className="Pagination__buttons">
                    {pageCount > 2 &&
                    <button className="Pagination__arrow"
                            onClick={() => onChangePage(1)}
                            disabled={currentPage === 1}>
                        <span className="material-icons">first_page</span>
                    </button>}
                    <button className="Pagination__arrow"
                            onClick={() => onChangePage(currentPage - 1)}
                            disabled={currentPage === 1}>
                        <span className="material-icons">chevron_left</span>
                    </button>
                    {list}
                    <button className="Pagination__arrow"
                            onClick={() => onChangePage(currentPage + 1)}
                            disabled={currentPage === pageCount}>
                        <span className="material-icons">chevron_right</span>
                    </button>
                    {pageCount > 2 &&
                    <button className="Pagination__arrow"
                            onClick={() => onChangePage(pageCount)}
                            disabled={currentPage === pageCount}>
                        <span className="material-icons">last_page</span>
                    </button>}
                </div>}

            <div className="Pagination__per-page">
                <div className="Pagination__page-count-text">
                    На странице:
                </div>
                <div className={cn("Pagination__page-count", {"Pagination__page-count-active": perPage === 15})}
                     onClick={() => onChangePerPage(15)}>
                    15
                </div>
                <div className={cn("Pagination__page-count", {"Pagination__page-count-active": perPage === 30})}
                     onClick={() => onChangePerPage(30)}>
                    30
                </div>
                <div className={cn("Pagination__page-count", {"Pagination__page-count-active": perPage === 50})}
                     onClick={() => onChangePerPage(50)}>
                    50
                </div>
            </div>
        </div>
    )
};

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangePerPage: PropTypes.func.isRequired
};

export default Pagination;
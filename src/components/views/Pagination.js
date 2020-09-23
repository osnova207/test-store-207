import React from "react";
import PropTypes from "prop-types";
import * as cn from "classnames";

const Pagination = ({ pageCount, perPage, currentPage, onChangePage, onChangePerPage }) => {
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
            {pageCount > 1 &&
                <React.Fragment>
                    {pageCount > 2 &&
                    <button className="pagination__arrow"
                            onClick={() => onChangePage(1)}
                            disabled={currentPage === 1}>
                        <span className="material-icons">first_page</span>
                    </button>}
                    <button className="pagination__arrow"
                            onClick={() => onChangePage(currentPage - 1)}
                            disabled={currentPage === 1}>
                        <span className="material-icons">chevron_left</span>
                    </button>
                    {list}
                    <button className="pagination__arrow"
                            onClick={() => onChangePage(currentPage + 1)}
                            disabled={currentPage === pageCount}>
                        <span className="material-icons">chevron_right</span>
                    </button>
                    {pageCount > 2 &&
                    <button className="pagination__arrow"
                            onClick={() => onChangePage(pageCount)}
                            disabled={currentPage === pageCount}>
                        <span className="material-icons">last_page</span>
                    </button>}
                </React.Fragment>}

            <div className="pagination__per-page">
                <div className="pagination__page-count-text">
                    На странице:
                </div>
                <div className={cn("pagination__page-count", {"pagination__page-count-active": perPage === 10})}
                     onClick={() => onChangePerPage(10)}>
                    10
                </div>
                <div className={cn("pagination__page-count", {"pagination__page-count-active": perPage === 20})}
                     onClick={() => onChangePerPage(20)}>
                    20
                </div>
                <div className={cn("pagination__page-count", {"pagination__page-count-active": perPage === 50})}
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
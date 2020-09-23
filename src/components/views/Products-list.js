import React from "react";
import * as PropTypes from "prop-types";
import * as cn from "classnames";
import SearchPanel from "./Search-panel";

const ProductsList = ({ list, onAdd, onEdit, onDelete, onSetSort, sortType, sortDirection, onSearch, searchKey }) => {

    const renderTable = () => (
        <div className='ProductsList__table'>
            <div className="ProductsList__header">
                <div className="ProductsList__row">
                    <div className={cn("ProductsList__cell ProductsList__cell-name sortable",
                        {'activeSort': sortType === "name"},
                        {'sort-down': sortDirection})}
                        onClick={() => onSetSort("name")}>
                        {sortType === "name" && <img src={require('../../assets/icons/sort.svg')} alt="sort-icon" className="sort-icon"/> }
                        Перечень товаров
                    </div>
                    <div className={cn("ProductsList__cell ProductsList__cell-price sortable",
                        {'activeSort': sortType === "price"},
                        {'sort-down': sortDirection})}
                         onClick={() => onSetSort("price")}>
                        {sortType === "price" && <img src={require('../../assets/icons/sort.svg')} alt="sort-icon" className="sort-icon"/> }
                        Стоимость
                    </div>
                    <div className={cn("ProductsList__cell ProductsList__cell-date sortable",
                        {'activeSort': sortType === "date"},
                        {'sort-down': sortDirection})}
                         onClick={() => onSetSort("date")}>
                        {sortType === "date" && <img src={require('../../assets/icons/sort.svg')} alt="sort-icon" className="sort-icon"/> }
                        Дата изменения
                    </div>
                    <div className="ProductsList__cell ProductsList__cell-control">
                        Управление
                    </div>
                </div>
            </div>
            <div className="ProductsList__body">
                {renderList()}
            </div>
        </div>
    );

    const renderList = () => {
        return list.map(item => (
            <div className="ProductsList__row" key={item.id}>
                <div className="ProductsList__cell ProductsList__cell-name">
                    {item.name}
                </div>
                <div className="ProductsList__cell ProductsList__cell-price">
                    {item.price + " $"}
                </div>
                <div className="ProductsList__cell ProductsList__cell-date">
                    {item.date}
                </div>
                <div className="ProductsList__cell ProductsList__cell-control">
                    <div className="ProductsList__edit button button-sm" onClick={() => onEdit(item.id)}>
                        Редактировать
                    </div>
                    <div className="ProductsList__delete button button-sm" onClick={() => onDelete(item.id)}>
                        Удалить
                    </div>
                </div>
            </div>
        ))
    };

    const renderEmptyList = () => (
        <div className="ProductsList__empty">
            Товар отсутствует
        </div>
    );

    return (
        <div className='ProductsList'>
            <div className='PropertiesList__top-panel content-top-panel'>
                <SearchPanel onSearch={onSearch} value={searchKey}/>
                <div className='ProductsList__add-button button' onClick={() => onAdd()}>Добавить товар</div>
            </div>
            {list.length ? renderTable() : renderEmptyList()}
        </div>
    )
};

ProductsList.defaultProps = {
    list: [],
};

ProductsList.propTypes = {
    list: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSetSort: PropTypes.func.isRequired,
    sortType: PropTypes.string.isRequired,
    sortDirection: PropTypes.bool.isRequired
};

export default ProductsList;
import React from "react";
import * as PropTypes from "prop-types";
import * as cn from "classnames";

const PropertiesList = ({ list, onDelete, addProperty, onSetSort, sortType, sortDirection }) => {

    const renderTable = () => (
        <div className='PropertiesList__table'>
            <div className="PropertiesList__header">
                <div className="PropertiesList__row">
                    <div className={cn("PropertiesList__cell PropertiesList__cell-name sortable",
                        {'activeSort': sortType === "name"},
                        {'sort-down': sortDirection})}
                         onClick={() => onSetSort("name")}>
                        {sortType === "name" && <img src={require('../../assets/icons/sort.svg')} alt="sort-icon" className="sort-icon"/> }
                        Название
                    </div>
                    <div className={cn("PropertiesList__cell PropertiesList__cell-type sortable",
                        {'activeSort': sortType === "type"},
                        {'sort-down': sortDirection})}
                         onClick={() => onSetSort("type")}>
                        {sortType === "type" && <img src={require('../../assets/icons/sort.svg')} alt="sort-icon" className="sort-icon"/> }
                        Тип
                    </div>
                    <div className="PropertiesList__cell PropertiesList__cell-control">
                        Управление
                    </div>
                </div>
            </div>
            <div className="PropertiesList__body">
                {renderList()}
            </div>
        </div>
    );

    const renderList = () => {
        return list.map(item => (
            <div className="PropertiesList__row" key={item.id}>
                <div className="PropertiesList__cell PropertiesList__cell-name">
                    {item.name}
                </div>
                <div className="PropertiesList__cell PropertiesList__cell-type">
                    {item.type}
                </div>
                <div className="PropertiesList__cell PropertiesList__cell-control">
                    <div className="PropertiesList__delete button button-sm" onClick={() => onDelete(item.id)}>
                        Удалить
                    </div>
                </div>
            </div>
        ))
    };

    const renderEmptyList = () => (
        <div className="PropertiesList__empty">
            Свойства отсутствуют
        </div>
    );

    return (
        <div className='PropertiesList'>
            <div className='PropertiesList__add-button button' onClick={() => addProperty()}>Добавить свойство</div>
            {list.length ? renderTable() : renderEmptyList()}
        </div>
    )
};

PropertiesList.defaultProps = {
    list: [],
};

PropertiesList.propTypes = {
    list: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    addProperty: PropTypes.func.isRequired,
    onSetSort: PropTypes.func.isRequired,
    sortType: PropTypes.string.isRequired,
    sortDirection: PropTypes.bool.isRequired
};

export default PropertiesList;
import React from "react";
import * as PropTypes from "prop-types";

const PropertiesList = ({ list, onDelete, addProperty }) => {

    const renderTable = () => (
        <div className='PropertiesList__table'>
            <div className="PropertiesList__header">
                <div className="PropertiesList__row">
                    <div className="PropertiesList__cell PropertiesList__cell-name">
                        Название
                    </div>
                    <div className="PropertiesList__cell PropertiesList__cell-type">
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
    addProperty: PropTypes.func.isRequired
};

export default PropertiesList;
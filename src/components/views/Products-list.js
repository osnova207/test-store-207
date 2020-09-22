import React from "react";
import * as PropTypes from "prop-types";

const ProductsList = ({ list, onAdd, onEdit, onDelete }) => {

    const renderTable = () => (
        <div className='ProductsList__table'>
            <div className="ProductsList__header">
                <div className="ProductsList__row">
                    <div className="ProductsList__cell ProductsList__cell-name">
                        Перечень товаров
                    </div>
                    <div className="ProductsList__cell ProductsList__cell-price">
                        Стоимость
                    </div>
                    <div className="ProductsList__cell ProductsList__cell-date">
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
            <div className='ProductsList__add-button button' onClick={() => onAdd()}>Добавить товар</div>
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
};

export default ProductsList;
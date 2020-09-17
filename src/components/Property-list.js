import React, {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as propertiesActions from "../actions/properties";
import * as cn from "classnames";

const PropertyList = ({ properties, dispatch }) => {

    const [activeSort, setActiveSort] = useState('');

    const setSort = (type) => {
        setActiveSort(type);
        switch (type) {
            case 'name_up':
                return dispatch(propertiesActions.toSortPropertiesByName(true));
            case 'name_down':
                return dispatch(propertiesActions.toSortPropertiesByName(false));
            case 'type_up':
                return dispatch(propertiesActions.toSortPropertiesByType(true));
            case 'type_down':
                return dispatch(propertiesActions.toSortPropertiesByType(false));
            default:
                return null;
        }
    };


    const propertiesList = properties.map((property) => {
        const {id, name, type} = property;
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{type}</td>
                <td>
                    <button
                        className='PropertyList__table__button button button-sm'
                        onClick={() => dispatch(propertiesActions.toDeleteProperty(id))}>Удалить
                    </button>
                </td>
            </tr>
        )
    });

    return (
        <div className='PropertyList'>
            <Link to='/add-property' className='PropertyList__add-button button'>Добавить проперти</Link>
            <div className='PropertyList__table-wrapper'>
                <table className="PropertyList__table">
                    <thead>
                    <tr>
                        <th onClick={() => setSort(activeSort === "name_up" ? "name_down" : "name_up")}>
                            {activeSort === "name_up" && <i className="material-icons">vertical_align_top</i> }
                            {activeSort === "name_down" && <i className="material-icons">vertical_align_bottom</i> }
                            Перечень проперти
                        </th>
                        <th onClick={() => setSort(activeSort === "type_up" ? "type_down" : "type_up")}>
                            {activeSort === "type_up" && <i className="material-icons">vertical_align_top</i> }
                            {activeSort === "type_down" && <i className="material-icons">vertical_align_bottom</i> }
                            Тип
                        </th>
                        <th>Управление</th>
                    </tr>
                    </thead>
                    <tbody>
                    {propertiesList}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const { properties } = state;
    return {
        properties
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);


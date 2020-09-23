import React, {useState} from "react";
import {connect} from "react-redux";
import Database from "../../database/Database";
import {toast} from 'react-toastify';
import PropertiesList from "../views/Properties-list";
import Pagination from "../views/Pagination";
import AddProperty from "../views/Add-property";
import {getPagePropertiesList, getSearchProperties} from "../../selectors/selectors";
import * as actions from "../../actions/actions";

const PropertiesContainer = (props) => {
    const {
        properties,
        listPerPage,
        propertiesPage,
        propertiesPerPage,
        sortType,
        sortDirection,
        searchKey,
        searchProperties,
        dispatch
    } = props;

    const database = new Database();
    const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
    const toggleAddPropertyModal = () => setShowAddPropertyModal(!showAddPropertyModal);

    const addProperty = (values) => {
        const checkProperty = properties.find((property) => property.name.toLowerCase() === values.name.toLowerCase());
        if (checkProperty) {
            toast.error('Невозможно добавить существующее свойство')
        } else {
            values.id = (properties.length) ? (properties.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id + 1) : 1;
            database.property(values.id).set({...values})
                .then(() => {
                    toast.success('Свойство успешно добавлено');
                    toggleAddPropertyModal();
                });
        }
    };

    const deleteProperty = (id) => {
        database.property(id).remove()
            .then(() => toast.success('Свойство успешно удалено'));
    };

    const getPageCount = () => {
        return Math.ceil(searchProperties.length / propertiesPerPage);
    };

    const changePage = (id) => dispatch(actions.setPropertiesPage(id));

    const changePerPageCount = (value) => dispatch(actions.setPropertiesPerPage(value));

    const setSort = (key) => {
        if (sortType === key) {
            dispatch(actions.setPropertiesSortDirectionUp())
        } else {
            dispatch(actions.setPropertiesSortType(key))
        }
    };

    const onSearch = (key) => dispatch(actions.setPropertiesSearchKey(key));

    return (
        <div className="Properties">
            <PropertiesList
                list={listPerPage}
                onDelete={deleteProperty}
                addProperty={toggleAddPropertyModal}
                onSetSort={setSort}
                sortType={sortType}
                sortDirection={sortDirection}
                onSearch={onSearch}
                searchKey={searchKey}
            />
            <Pagination
                pageCount={getPageCount()}
                perPage={propertiesPerPage}
                currentPage={propertiesPage}
                onChangePage={changePage}
                onChangePerPage={changePerPageCount}
            />
            <AddProperty
                show={showAddPropertyModal}
                onSave={addProperty}
                onClose={toggleAddPropertyModal}
            />
        </div>
    )
};

const mapStateToProps = (state) => {
    const { properties, propertiesPage, propertiesPerPage, propertiesSortType, propertiesSortDirectionUp, propertiesSearchKey } = state;
    return {
        properties,
        propertiesPage,
        propertiesPerPage,
        listPerPage: getPagePropertiesList(state),
        sortType: propertiesSortType,
        sortDirection: propertiesSortDirectionUp,
        searchKey: propertiesSearchKey,
        searchProperties: getSearchProperties(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesContainer);


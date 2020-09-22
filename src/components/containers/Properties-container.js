import React, {useState} from "react";
import {connect} from "react-redux";
import Database from "../../database/Database";
import {toast} from 'react-toastify';
import PropertiesList from "../views/Properties-list";
import Pagination from "../views/Pagination";
import AddProperty from "../views/Add-property";
import {getPagePropertiesList} from "../../selectors/selectors";
import * as actions from "../../actions/actions";

const PropertiesContainer = ({ properties, listPerPage, propertiesPage, propertiesPerPage, dispatch}) => {

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
        return Math.ceil(properties.length / propertiesPerPage);
    };

    const changePage = (id) => dispatch(actions.setPropertiesPage(id));

    const changePerPageCount = (value) => dispatch(actions.setPropertiesPerPage(value));

    return (
        <div className="Properties">
            <PropertiesList
                list={listPerPage}
                onDelete={deleteProperty}
                addProperty={toggleAddPropertyModal}
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
    const { properties, propertiesPage, propertiesPerPage } = state;
    return {
        properties,
        propertiesPage,
        propertiesPerPage,
        listPerPage: getPagePropertiesList(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesContainer);


import React, {useState} from "react";
import {connect} from "react-redux";
import Database from "../../database/Database";
import {toast} from 'react-toastify';
import PropertiesList from "../views/Properties-list";
import AddProperty from "../views/Add-property";

const PropertiesContainer = ({ properties }) => {

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

    return (
        <div className="Properties">
            <PropertiesList
                list={properties}
                onDelete={deleteProperty}
                addProperty={toggleAddPropertyModal}
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

    const { properties } = state;

    return {
        properties
    }
};

export default connect(mapStateToProps)(PropertiesContainer);


import React, {useEffect, useState} from "react";
import * as firebase from "firebase";
import AddProperty from "./Add-property";
import {showNotification} from "../utils/utils";
import {AppConfig} from "../AppConfig";

const PropertyList = () => {

    const [properties, setProperties] = useState([]);
    const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
    const database = firebase.database().ref('/properties');

    const toggleAddPropertyModal = () => setShowAddPropertyModal(!showAddPropertyModal);

    useEffect(() => {
        database.on('value', ((snapshot) => {
            const data = snapshot.val() ? Object.values(snapshot.val()) : [];
            if (data.length !== properties.length) setProperties(data);
        }));
        return () => {
            database.off();
        }
    });

    const addNewProperty = (values) => {
        const checkProperty = properties.find((property) => property.name.toLowerCase() === values.name.toLowerCase());
        if (checkProperty) {
            showNotification(AppConfig.notifications.propertyAlreadyExist);
        } else {
            values.id = (properties.length) ? (properties.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id + 1) : 1;
            firebase.database().ref(`/properties/property${values.id}`).set({...values})
                .then(() => {
                    showNotification(AppConfig.notifications.propertySuccessfullyAdded);
                    toggleAddPropertyModal();
                });
        }
    };

    const deleteProperty = (id) => {
        firebase.database().ref(`/properties/property${id}`).remove()
            .then(() => showNotification(AppConfig.notifications.propertySuccessfullyDeleted));
    };

    const propertiesList = properties.map((property) => {
        const {id, name, type} = property;
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{type}</td>
                <td>
                    <button className='PropertyList__table__button button button-sm' onClick={() => deleteProperty(property.id)}>
                        Удалить
                    </button>
                </td>
            </tr>
        )
    });

    return (
        <div className='PropertyList'>
            <div className='PropertyList__add-button button' onClick={toggleAddPropertyModal}>Добавить проперти</div>
            <div className='PropertyList__table-wrapper'>
                <table className="PropertyList__table">
                    <thead>
                        <tr>
                            <th>Перечень проперти</th>
                            <th>Тип</th>
                            <th>Управление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propertiesList}
                    </tbody>
                </table>
            </div>
            <AddProperty
                show={showAddPropertyModal}
                onClose={toggleAddPropertyModal}
                properties={properties}
                onSave={addNewProperty}
            />
        </div>
    )
};

export default PropertyList;


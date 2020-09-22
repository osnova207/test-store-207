import React from "react";
import * as PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {formErrorCheck} from "../../utils/utils";
import * as Yup from "yup";
import {validationSchema} from "../../validation/add-property";
import * as cn from "classnames";

const AddProperty = ({ show, onSave, onClose}) => {

    return (
       <Modal
           show={show}
           centered={true}
           onHide={() => onClose()}
           className="AddProperty">
           <Modal.Header className="AddProperty__header">
               <div className="AddProperty__title">
                   Добавление свойства
               </div>
               <div className="AddProperty__cancel button" onClick={() => onClose()}>
                   Отменить
               </div>
           </Modal.Header>
           <Modal.Body className="AddProperty__body">
               <Formik
                   initialValues={{ name: '', type: ''}}
                   validationSchema={Yup.object(validationSchema)}
                   onSubmit={(values, {setSubmitting}) => {
                       setSubmitting(false);
                       onSave(values);
                   }}>
                   {({errors, touched, handleSubmit}) => (
                       <Form className='AddProperty__form'
                             onSubmit={handleSubmit}>
                           <label htmlFor="name"
                                  className='AddProperty__label required'>Название свойства</label>
                           <Field
                               id='name'
                               name="name"
                               placeholder='Цвет авто'
                               className={cn('AddProperty__input', {'error-input': formErrorCheck(errors, touched, 'name')})}/>
                           {formErrorCheck(errors, touched, 'name') ? (
                               <div className='error-hint'>{errors.name}</div>) : null}

                           <label htmlFor="type"
                                  className='AddProperty__label required'>Укажите тип свойства</label>
                           <div className="AddProperty__values">
                               <div className="AddProperty__value">
                                   <Field
                                       className='custom-checkbox'
                                       id='dropdown'
                                       type='radio'
                                       name='type'
                                       value='select'/>
                                   <label
                                       htmlFor='dropdown'>
                                       Dropdown
                                   </label>
                               </div>
                               <div className="AddProperty__value">
                                   <Field
                                       className='custom-checkbox'
                                       id='string'
                                       type='radio'
                                       name='type'
                                       value='string'/>
                                   <label
                                       htmlFor='string'>
                                       String
                                   </label>
                               </div>
                               <div className="AddProperty__value">

                                   <Field
                                       className='custom-checkbox'
                                       id='number'
                                       type='radio'
                                       name='type'
                                       value='number'/>
                                   <label
                                       htmlFor='number'>
                                       Number
                                   </label>
                               </div>
                           </div>
                           {formErrorCheck(errors, touched, 'type') ? (
                               <div className='error-hint'>{errors.type}</div>) : null}

                           <button
                               type='submit'
                               disabled={formErrorCheck(errors, touched, 'name') ||
                               formErrorCheck(errors, touched, 'type')}
                               className="AddProperty__submit button">Сохранить
                           </button>
                       </Form>
                   )}
               </Formik>
           </Modal.Body>
       </Modal>
    )
};

AddProperty.defaultProps = {
    show: false,
};

AddProperty.propTypes = {
    show: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AddProperty;

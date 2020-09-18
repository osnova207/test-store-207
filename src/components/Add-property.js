import React from "react";
import * as Yup from "yup";
import {validationSchema} from "../validation/add-property";
import {Field, Form, Formik} from "formik";
import * as cn from "classnames";
import {formErrorCheck} from "../utils/utils";
import {Modal} from "react-bootstrap";

const AddProperty = (props) => {

    return (
       <Modal
           show={props.show}
           centered={true}
           onHide={() => props.onClose()}
       >
           <Modal.Header closeButton>
               <div className='AddProperty__title'>
                   Добавление свойства
               </div>
           </Modal.Header>
           <Modal.Body>
               <div>
                   <Formik
                       initialValues={{ name: '', type: ''}}
                       validationSchema={Yup.object(validationSchema)}
                       onSubmit={(values, {setSubmitting}) => {
                           setSubmitting(false);
                           props.onSave(values);
                       }}>
                       {({errors, touched, handleSubmit}) => (
                           <Form className='AddProperty__form'
                                 onSubmit={handleSubmit}>
                               <div className='AddProperty__buttons'>
                                   <button
                                       type='button'
                                       className="AddProperty__buttons__button button"
                                       onClick={() => props.onClose()}>Отменить
                                   </button>
                                   <button
                                       type='submit'
                                       disabled={formErrorCheck(errors, touched, 'name') ||
                                       formErrorCheck(errors, touched, 'type')}
                                       className="AddProperty__buttons__button button">Сохранить
                                   </button>
                               </div>

                               <label htmlFor="name"
                                      className='AddProperty__form__label required'>Название свойства</label>
                               <Field
                                   id='name'
                                   name="name"
                                   placeholder='Цвет авто'
                                   className={cn('AddProperty__form__input', {'error-input': formErrorCheck(errors, touched, 'name')})}/>
                               {formErrorCheck(errors, touched, 'name') ? (
                                   <div className='error-hint'>{errors.name}</div>) : null}

                               <label htmlFor="type"
                                      className='AddProperty__form__label required'>Укажите тип свойства</label>

                               <div className="AddProperty__form__values">
                                   <div className="AddProperty__form__value">
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
                                   <div className="AddProperty__form__value">
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
                                   <div className="AddProperty__form__value">

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
                           </Form>
                       )}
                   </Formik>
               </div>
           </Modal.Body>
       </Modal>
    )
};

export default AddProperty;

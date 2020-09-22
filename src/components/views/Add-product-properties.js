import React from "react";
import {Field, FieldArray} from "formik";
import * as cn from "classnames";
import {fieldArrayFormErrorCheck, fieldArraySelectFormErrorCheck} from "../../utils/utils";
import * as PropTypes from "prop-types";

const AddProductProperties = ({properties, values, errors, touched}) => {

    const getValuesBlock = (values, index, errors, touched) => {
        const selectedProperty = properties.find(item => item.name === values.customProperties[index].name);
        const selectedPropertyType = selectedProperty ? selectedProperty.type : values.customProperties[index].type;

        switch (selectedPropertyType) {
            case 'string':
                values.customProperties[index].type = selectedPropertyType;
                return (
                    <>
                        <label htmlFor={`customProperties[${index}].value`}
                               className='AddProduct__label required'>{`Значение свойства ${index + 1}`}
                        </label>
                        <Field
                            id={`customProperties[${index}].value`}
                            name={`customProperties[${index}].value[0]`}
                            type={'text'}
                            value={values.customProperties[index].value[0]}
                            className={cn('AddProduct__input', {'error-input': fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0)})}
                        />
                        {fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0) ? (
                            <div className='error-hint'>{errors.customProperties[index].value[0]}</div>) : null}
                    </>
                );

            case 'number':
                values.customProperties[index].type = selectedPropertyType;
                return (
                    <>
                        <label htmlFor={`customProperties[${index}].value`}
                               className='AddProduct__label required'>{`Значение свойства ${index + 1}`}</label>
                        <Field
                            id={`customProperties[${index}].value`}
                            name={`customProperties[${index}].value[0]`}
                            value={values.customProperties[index].value[0]}
                            className={cn('AddProduct__input', {'error-input': fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0)})}/>
                        {fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0) ? (
                            <div className='error-hint'>{errors.customProperties[index].value[0]}</div>) : null}
                    </>
                );

            case 'select':
                values.customProperties[index].type = selectedPropertyType;
                return (
                    <FieldArray
                        name={`customProperties[${index}].value`}
                        render={({push, remove}) => (
                            <div className="select-values-block">
                                <div className='AddProduct__label required'>{`Значение свойства ${index + 1}`}</div>
                                {values.customProperties[index].value && values.customProperties[index].value.map((prop, idx) => (
                                    <div className="select-value" key={idx}>
                                        <Field
                                            name={`customProperties[${index}].value[${idx}]`}
                                            className={cn('AddProduct__input', {'error-input': fieldArraySelectFormErrorCheck(errors, touched, 'value', index, idx)})}
                                        >
                                        </Field>
                                        {fieldArraySelectFormErrorCheck(errors, touched, 'value', index, idx) ? (
                                            <div
                                                className='error-hint'>{errors.customProperties[index].value[idx]}</div>) : null}
                                        {values.customProperties[index].value.length > 1 &&
                                            <button
                                                className="AddProduct__delete-value"
                                                type="button"
                                                onClick={() => remove(idx)}
                                            >
                                                -
                                            </button>}
                                    </div>
                                ))}
                                <button
                                    className="AddProduct__add-value"
                                    type="button"
                                    onClick={() => {
                                        push('')
                                    }}>
                                    +
                                </button>
                            </div>
                        )}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <FieldArray
            name="customProperties"
            render={({push, remove}) => (
                <div className="AddProduct__custom-properties">
                    <div className='AddProduct__title sub-title'>
                        Добавление товару свойств
                        {values.customProperties && values.customProperties.length < properties.length &&
                        <button
                            className="AddProduct__add-property"
                            type="button"
                            onClick={() => push({ name: "", value: ['']})}>
                            +
                        </button>}
                    </div>

                    {values.customProperties && values.customProperties.map((property, index) => (
                        <div className="AddProduct__custom-properties-block" key={index}>

                            <div className="AddProduct__left-col">
                                <label htmlFor={`customProperties[${index}].name`}
                                       className='AddProduct__label required'>{`Свойство ${index + 1}`}</label>
                                <Field
                                    id={`customProperties[${index}].name`}
                                    component={'select'}
                                    name={`customProperties[${index}].name`}
                                    className={cn('AddProduct__input', {'error-input': fieldArrayFormErrorCheck(errors, touched, 'name', index)})}>
                                    {(values.customProperties[index].name) ?
                                        (<option label={values.customProperties[index].name}/>)
                                        : (<option hidden value={'0'}>{'Выберите свойство'}</option>)}
                                    {properties.map((option, idx) =>
                                        (values.customProperties.find((item) => item.name === option.name) ?
                                            null : <option key={idx}>{option.name}</option>))}
                                </Field>
                                {fieldArrayFormErrorCheck(errors, touched, 'name', index) ? (
                                    <div className='error-hint'>{errors.customProperties[index].name}</div>) : null}

                                <button
                                    className="AddProduct__delete-property"
                                    type="button"
                                    onClick={() => remove(index)}>
                                    -
                                </button>
                            </div>

                            <div className="AddProduct__right-col">
                                {values.customProperties[index].name && getValuesBlock(values, index, errors, touched)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        />
    )
};

AddProductProperties.defaultProps = {
    properties: []
};

AddProductProperties.propTypes = {
    properties: PropTypes.array.isRequired
};

export default AddProductProperties;

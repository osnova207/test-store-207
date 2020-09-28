import React from "react";
import {Link} from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import * as cn from "classnames";
import * as PropTypes from "prop-types";

const ProductCard = ({ product, imgZoom, toggleImg, closeImg }) => {

    const { name, price, date, image, description, customProperties } = product;

    const renderCustomProperties = () => (
        customProperties?.map((property) => (
            <div className='ProductCard__property' key={property.name}>
                <div className='ProductCard__label'>{property.name}</div>
                {property.value.length === 1 && <div className='ProductCard__value'>{property.value[0]}</div>}
                {property.value.length > 1 &&
                <ul className="ProductCard__value values-list">
                    {property.value.map((item, idx) => (
                        <li key={item + idx}>{item}</li>
                    ))}
                </ul>}
            </div>
        ))
    );

    return (
        <div className='ProductCard'>
            <Link to='/products-list/' className='ProductCard__back-link button'>Вернуться</Link>
            <div className="ProductCard__title-block">
                <div className="ProductCard__img-container" onClick={toggleImg}>
                    <OutsideClickHandler onOutsideClick={closeImg}>
                        <img className={cn('ProductCard__img', {'img-zoom': imgZoom})} src={image}
                             alt='product-img'/>
                    </OutsideClickHandler>
                </div>
                <div className='ProductCard__title'>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className='ProductCard__properties-block'>
                <div className='ProductCard__property'>
                    <div className='ProductCard__label'>{date ? "Дата добавления" : ""}</div>
                    <div className='ProductCard__value'>{date}</div>
                </div>
                <div className='ProductCard__property'>
                    <div className='ProductCard__label'>{"Стоимость"}</div>
                    <div className='ProductCard__value'>{price + " $"}</div>
                </div>
                {renderCustomProperties()}
            </div>
        </div>
    )
};

ProductCard.defaultProps = {
    product: {},
    imgZoom: false,
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    imgZoom: PropTypes.bool.isRequired,
    toggleImg: PropTypes.func.isRequired,
    closeImg: PropTypes.func.isRequired,
};

export default ProductCard;
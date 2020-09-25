import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import * as cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

const ProductCard = (props) => {

    const { id } = props.match.params;
    const product = props.products.find((product) => product.id === Number(id)) || {};
    const { name, price, description, image, date, customProperties } = product;

    const [imgZoom, setImgZoom] = useState(false);

    const renderCustomProperties = () => (
        customProperties?.map((property) => (
            <div className='ProductCard__property' key={property.name}>
                <div className='ProductCard__label'>{property.name}</div>
                {property.value.length === 1 && <div className='ProductCard__property-block__value'>{property.value[0]}</div>}
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
                <div className="ProductCard__img-container" onClick={() => setImgZoom(!imgZoom)}>
                    <OutsideClickHandler onOutsideClick={() => setImgZoom(false)}>
                        <img className={cn('ProductCard__img', {'img-zoom': imgZoom})} src={image} alt='product-img' />
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
                    <div className='ProductCard__label'>{price ? "Стоимость" : ""}</div>
                    <div className='ProductCard__value'>{price ? price + " $" : ""}</div>
                </div>
                {renderCustomProperties()}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
  const { products } = state;
  return {
      products
  }
};

export default connect(mapStateToProps)(withRouter(ProductCard));
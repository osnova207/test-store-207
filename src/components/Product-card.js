import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const ProductCard = ({products, id}) => {

    const product = products.find((product) => product.id === id) || {};
    const { name, price, description, image, date, customProperties } = product;

    const renderCustomProperties = () => {

        return customProperties.map((property) => {
            return (
                <React.Fragment key={property.name}>
                    <div className='ProductCard__property-block__property'>{property.name}</div>
                    {property.value.length === 1 && <div className='ProductCard__property-block__value'>{property.value[0]}</div>}
                    {property.value.length > 1 &&
                        <ul className="ProductCard__property-block__values">
                            {property.value.map((item, idx) => (
                                <li key={item + idx}>{item}</li>
                            ))}
                        </ul>}
                </React.Fragment>
            )
        })
    };

    return (
        <div className='ProductCard'>
            <Link to='/products-list/' className='ProductCard__back-link'>Вернуться</Link>
            <div className="ProductCard__content-divider"/>
            <div className="ProductCard__title-block">
                <div className='ProductCard__title-block__img' style={{backgroundImage: `url(${image})`}} />
                <div className='ProductCard__title-block__title'>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className='ProductCard__property-block'>
                <div className='ProductCard__property-block__property'>Дата добавления</div>
                <div className='ProductCard__property-block__value'>{date}</div>
                <div className='ProductCard__property-block__property'>Стоимость</div>
                <div className='ProductCard__property-block__value'>{`${price} $`}</div>
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

export default connect(mapStateToProps)(ProductCard);
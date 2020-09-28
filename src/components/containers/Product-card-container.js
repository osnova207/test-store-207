import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Preloader from "../Preloader";
import ProductCard from "../views/Product-card";

class ProductCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgZoom: false,
            product: {},
            isLoaded: false
        };
    }

    componentDidMount() {
        this.findProduct();
        window.addEventListener('resize', this.onResize);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.product.id) this.findProduct()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    findProduct = () => {
        const { id } = this.props.match.params;
        const product = this.props.products.find((product) => product.id === Number(id));
        if (product) this.setState({ product: product, isLoaded: true});
    };

    toggleImg = () => {
        const { imgZoom } = this.state;
        const width = window.innerWidth;
        if (width > 768) this.setState({ imgZoom: !imgZoom})
    };

    closeImg = () => this.setState({ imgZoom: false });

    onResize = () => {
        const { imgZoom } = this.state;
        const width = window.innerWidth;
        if (imgZoom && width <= 768) this.setState({ imgZoom: false})
    };

    render() {
        return this.state.isLoaded ?
            <ProductCard
                product={this.state.product}
                imgZoom={this.state.imgZoom}
                toggleImg={this.toggleImg}
                closeImg={this.closeImg}
            />
            :
            <Preloader/>;
    }
}

const mapStateToProps = (state) => {
  const { products } = state;
  return {
      products
  }
};

export default connect(mapStateToProps)(withRouter(ProductCardContainer));
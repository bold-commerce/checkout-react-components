import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Price, Details, Image
} from '@bold-commerce/stacks-ui';
import './Product.css';
import ProductQuantityInput from '../product_quantity/ProductQuantityInput';

const Product = ({
  title, img, qty, lineItemKey, description, updateQuantity, totalPrice, removeLineItem, readOnly = false,
}) => (
  <>
    <div className="CartItem__ImageDescriptionWrapper">
      <div className="CartItem__ProductImageWrapper">
        <Image
          title={title}
          alt={title}
          src={img}
        />
      </div>
      <div className="CartItem__ProductDetails">
        <Details
          title={title}
          description={description}
        />
        {
          !readOnly
                      && (
                        <Button
                          secondary
                          onClick={() => removeLineItem(lineItemKey)}
                        >
                          Remove
                        </Button>
                      )
        }
      </div>
    </div>
    <div className="CartItem__QuantityPriceWrapper">
      <ProductQuantityInput
        readOnly={readOnly}
        defaultValue={qty}
        onChange={(v) => {updateQuantity(v, lineItemKey)}}
      />
      <div className="CartItem__ProductPrice">
        <Price amount={totalPrice} />
      </div>
    </div>
  </>
);


Product.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  qty: PropTypes.number.isRequired,
  lineItemKey: PropTypes.string.isRequired,
  description: PropTypes.string,
  updateQuantity: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default Product;

import React from 'react';
import PropTypes from 'prop-types';
import Product from '../product/Product';

const LineItem = ({
  title,
  image,
  quantity,
  price,
  totalPrice,
  lineItemKey,
  description,
  onQuantityChange,
  onRemove,
  readOnly = false,
}) => (
  <div className="SummaryBlock CartItem" key={lineItemKey}>
    <Product
      title={title}
      img={image}
      qty={quantity}
      itemPrice={price}
      totalPrice={totalPrice}
      lineItemKey={lineItemKey}
      description={description}
      updateQuantity={onQuantityChange}
      removeLineItem={onRemove}
      readOnly={readOnly}
    />
  </div>
);

LineItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  totalPrice: PropTypes.number,
  lineItemKey: PropTypes.string,
  description: PropTypes.string,
  onQuantityChange: PropTypes.func,
  onRemove: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default LineItem;

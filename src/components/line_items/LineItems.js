/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Product from '../product/Product';

const LineItems = ({
  lineItems,
  updateLineItemQuantity,
  removeLineItem,
  readOnly,
}) => (
  <>
    {lineItems.map((item) => (
      <div className="SummaryBlock CartItem" key={item.product_data.line_item_key}>
        <Product
          title={item.product_data.title}
          img={item.product_data.image_url}
          qty={item.product_data.quantity}
          itemPrice={item.product_data.price}
          totalPrice={item.product_data.total_price}
          lineItemKey={item.product_data.line_item_key}
          description={item.product_data.description}
          updateQuantity={updateLineItemQuantity}
          removeLineItem={removeLineItem}
          readOnly={readOnly}
        />
      </div>
    ))}
  </>
);

LineItems.propTypes = {
  lineItems: PropTypes.any,
  updateLineItemQuantity: PropTypes.func,
  removeLineItem: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default LineItems;

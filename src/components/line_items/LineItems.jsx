/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import LineItem from './LineItem';
import { useLineItems } from '../../hooks';

const LineItems = ({
  readOnly,
  lineItems,
  updateLineItemQuantity,
  removeLineItem,
}) => {
  const lineItemList = lineItems.map((item) => (
    <LineItem
      title={item.product_data.title}
      image={item.product_data.image_url}
      quantity={item.product_data.quantity}
      price={item.product_data.price}
      totalPrice={item.product_data.total_price}
      lineItemKey={item.product_data.line_item_key}
      onQuantityChange={(lineItemKey, value) => updateLineItemQuantity(lineItemKey, value)}
      onRemove={(lineItemKey) => removeLineItem(lineItemKey)}
      readOnly={readOnly}
      key={item.product_data.line_item_key}
    />
  ));

  return lineItemList;
};

LineItems.propTypes = {
  readOnly: PropTypes.bool,
  lineItems: PropTypes.array,
  updateLineItemQuantity: PropTypes.func,
  removeLineItem: PropTypes.func,
};

const MemoizedLineItems = React.memo(LineItems);

const LineItemsContainer = ({ readOnly }) => {
  const { lineItems, updateLineItemQuantity, removeLineItem } = useLineItems();

  return (
    <MemoizedLineItems
      lineItems={lineItems}
      updateLineItemQuantity={updateLineItemQuantity}
      removeLineItem={removeLineItem}
      readOnly={readOnly}
    />
  );
};

LineItemsContainer.propTypes = {
  readOnly: PropTypes.bool,
};

export default LineItemsContainer;

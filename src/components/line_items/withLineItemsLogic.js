import React from 'react';
import useLineItems from '../../hooks/useLineItems';

const withLineItemsLogic = (Component) => {
  const WithLineItemsLogic = (props) => {
    const {
      lineItems, addLineItem, loadingLineItems, updateLineItemQuantity, removeLineItem,
    } = useLineItems();

    const updatedProps = {
      ...props,
      lineItems,
      loadingLineItems,
      addLineItem,
      updateLineItemQuantity,
      removeLineItem,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...updatedProps} />;
  };

  return WithLineItemsLogic;
};

export default withLineItemsLogic;

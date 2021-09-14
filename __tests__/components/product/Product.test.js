import React from 'react';
import { render } from '@testing-library/react';
import Product from '../../../src/components/product/Product';

describe('Product', () => {
  test('renders Product component with editable quantity', () => {
    const { asFragment } = render(
      <Product
        title="Product A"
        image="https://via.placeholder.com/150"
        quantity={2}
        lineItemKey="abcd"
        description="Test description goes here"
        onQuantityChange={() => {}}
        totalPrice={19998}
        onRemove={() => {}}
        readOnly={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Product component with read-only quantity', () => {
    const { asFragment } = render(
      <Product
        title="Product A"
        image="https://via.placeholder.com/150"
        quantity={2}
        lineItemKey="abcd"
        description="Test description goes here"
        onQuantityChange={() => {}}
        totalPrice={19998}
        onRemove={() => {}}
        readOnly
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { Discount } from '../../../src/components/discount/Discount';

describe('Discount', () => {
  test('renders Discount component with no discount applied', () => {
    const { asFragment } = render(
      <Discount
        discountApplied={false}
        discountCode=""
        discountErrors={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Discount component with a discount applied', () => {
    const { asFragment } = render(
      <Discount
        discountApplied
        discountCode="TESTDISCOUNT"
        discountErrors={null}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Discount component with invalid discount code', () => {
    const { asFragment } = render(
      <Discount
        discountApplied={false}
        discountCode="TESTDISCOUNT"
        discountErrors={{
          discounts: 'Discount code is not valid',
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { RedactedCreditCard } from '../../../src/components/redacted_credit_card';

describe('RedactedCreditCard', () => {
  test('renders RedactedCreditCard component', () => {
    const { asFragment } = render(
      <RedactedCreditCard
        brand="Visa"
        lineText="1234"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

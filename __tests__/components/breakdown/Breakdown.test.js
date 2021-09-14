import React from 'react';
import { render } from '@testing-library/react';
import { Breakdown } from '../../../src/components/breakdown/Breakdown';
import testApplicationState from '../../utils/applicationStateHelper';

const testData = {
  subTotal: 22500,
  shippingTotal: 1000,
  discountTotal: 0,
  total: 26200,
  remainingBalance: 0,
  taxesTotal: 2700,
  payments: testApplicationState.payments,
  hasPayments: true,
  taxesIncluded: false,
  taxes: testApplicationState.taxes,
  discountApplied: false,
  discountCode: '',
};

describe('Breakdown', () => {
  test('renders Breakdown component', () => {
    const { asFragment } = render(
      <Breakdown
        subTotal={testData.subTotal}
        shippingTotal={testData.shippingTotal}
        discountTotal={testData.discountTotal}
        total={testData.total}
        remainingBalance={testData.remainingBalance}
        taxesTotal={testData.taxesTotal}
        payments={testData.payments}
        hasPayments={testData.hasPayments}
        taxesIncluded={testData.taxesIncluded}
        taxes={testData.taxes}
        discountApplied={testData.discountApplied}
        discountCode={testData.discountCode}
        removeDiscount={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Breakdown component with discount applied', () => {
    const { asFragment } = render(
      <Breakdown
        subTotal={testData.subTotal}
        shippingTotal={testData.shippingTotal}
        discountTotal={100}
        total={testData.total}
        remainingBalance={testData.remainingBalance}
        taxesTotal={testData.taxesTotal}
        payments={testData.payments}
        hasPayments={testData.hasPayments}
        taxesIncluded={testData.taxesIncluded}
        taxes={testData.taxes}
        discountApplied
        discountCode="TestDiscount"
        removeDiscount={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Breakdown component with taxes included', () => {
    const { asFragment } = render(
      <Breakdown
        subTotal={testData.subTotal}
        shippingTotal={testData.shippingTotal}
        discountTotal={testData.discountTotal}
        total={testData.total}
        remainingBalance={testData.remainingBalance}
        taxesTotal={testData.taxesTotal}
        payments={testData.payments}
        hasPayments={testData.hasPayments}
        taxesIncluded
        taxes={testData.taxes}
        discountApplied={testData.discountApplied}
        discountCode={testData.discountCode}
        removeDiscount={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

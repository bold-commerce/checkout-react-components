import { useContext } from 'react';
import CheckoutContext from '../components/Context';
import useTaxes from './useTaxes';

const useBreakdown = () => {
  const {
    payments,
    discounts,
    selectedShipping,
    lineItems,
  } = useContext(CheckoutContext);

  const { taxes } = useTaxes();

  const subTotal = lineItems.reduce((acc, curr) => acc + curr.product_data.total_price, 0);
  const shippingTotal = selectedShipping?.amount ?? 0;
  const discountTotal = discounts[0]?.value ?? 0;
  const excludedTaxes = taxes.reduce((acc, curr) => (!curr.is_included ? acc + curr.value : acc), 0);
  const taxesIncluded = taxes[0]?.is_included;
  const taxesTotal = taxes.reduce((acc, curr) => acc + curr.value, 0);
  const total = subTotal + shippingTotal + excludedTaxes - discountTotal;
  let remainingBalance = total;
  if (payments.length > 0) {
    const totalPayments = payments.length === 1 ? payments[0]?.value : payments.reduce((prevVal, currVal) => (prevVal + currVal.value), 0);
    remainingBalance = total - totalPayments;
  }
  const totalItems = lineItems.reduce((acc, item) => acc + item?.product_data?.quantity, 0);
  const paymentsMade = payments?.length > 0;
  const paymentStatus = payments[0]?.status !== '';

  return {
    subTotal,
    totalItems,
    shippingTotal,
    discountTotal,
    taxesTotal,
    total,
    taxes,
    payments,
    taxesIncluded,
    remainingBalance,
    paymentsMade,
    paymentStatus,
  };
};

export default useBreakdown;

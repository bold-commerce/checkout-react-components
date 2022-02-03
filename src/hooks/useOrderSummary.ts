import { useContext, useMemo } from 'react';
import { CheckoutStore } from '../store';
import { Address, Customer, Payment, ShippingLine } from '../types';

const useOrderSummary = (): {
  data: {
    customer: Customer | null,
    shippingAddress: Address | null,
    billingAddress: Address | null,
    selectedShipping: ShippingLine | null,
    payments: Payment[]
  }
} => {
  const { state } = useContext(CheckoutStore);
  const { customer, payments } = state.applicationState;
  const shippingAddress = state.applicationState.addresses.shipping;
  const billingAddress = state.applicationState.addresses.billing;
  const selectedShipping = state.applicationState.shipping?.selected_shipping ?? null;

  const memoizedCustomer = useMemo(() => customer, [JSON.stringify(customer)]);
  const memoizedShippingAddress = useMemo(() => shippingAddress, [JSON.stringify(shippingAddress)]);
  const memoizedBillingAddress = useMemo(() => billingAddress, [JSON.stringify(billingAddress)]);
  const memoizedSelectedShipping = useMemo(() => selectedShipping, [JSON.stringify(selectedShipping)]);
  const memoizedPayments = useMemo(() => payments, [JSON.stringify(payments)]);

  return {
    data: {
      customer: memoizedCustomer,
      shippingAddress: memoizedShippingAddress,
      billingAddress: memoizedBillingAddress,
      selectedShipping: memoizedSelectedShipping,
      payments: memoizedPayments,
    },
  };
};

export default useOrderSummary;

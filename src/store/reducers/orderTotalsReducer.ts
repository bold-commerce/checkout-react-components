import { Action } from "../../types/Action";
import { ApplicationState } from "../../types/ApplicationState";
import { CheckoutState } from "../../types/CheckoutState";
import { OrderTotals } from "../../types/OrderTotals";

export const calculateTotals = (applicationState: ApplicationState): OrderTotals => {
  const lineItems = applicationState.line_items;
  const taxes = applicationState?.taxes;
  const payments = applicationState?.payments;
  const subTotal = lineItems.reduce((acc, curr) => acc + curr.product_data.total_price, 0);
  const totalItems = lineItems.reduce((acc, item) => acc + item?.product_data?.quantity, 0);
  const shippingTotal = applicationState?.shipping?.selected_shipping_line?.amount ?? 0;
  const excludedTaxes = taxes.reduce((acc, curr) => (!curr.is_included ? acc + curr.value : acc), 0);
  const discountTotal = applicationState?.discounts[0]?.value ?? 0;
  const totalPayments = payments.reduce((prevVal, currVal) => (prevVal + currVal.amount), 0) || 0;
  const taxesTotal = taxes.reduce((acc, curr) => acc + curr.value, 0);
  const total = subTotal + shippingTotal + excludedTaxes - discountTotal;
  const remainingBalance = totalPayments ? total - totalPayments : total;

  return {
    subTotal,
    shippingTotal,
    excludedTaxes,
    discountTotal,
    total,
    remainingBalance,
    taxesTotal,
    totalItems,
  };
};

const orderTotalsReducer = (state: CheckoutState, action: Action<ApplicationState>): OrderTotals => {
  switch (action.type) {
    case 'checkout/update':
      return calculateTotals(action.payload);
    case 'checkout/init':
      return calculateTotals(state.applicationState);
    default:
      return state.orderTotals;
  }
};

export default orderTotalsReducer;

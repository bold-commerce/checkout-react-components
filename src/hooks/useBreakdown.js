import {
  useContext,
  useEffect,
  useState,
} from 'react';
import CheckoutContext from '../components/Context';

const useBreakdown = () => {
  const {
    applicationState,
  } = useContext(CheckoutContext);
  const [subTotal, setSubtotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [taxesTotal, setTaxesTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [includedTaxes, setIncludedTaxes] = useState(0);
  const [excludedTaxes, setExcludedTaxes] = useState(0);
  const [taxesIncluded, setTaxesIncluded] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState(0);


  const lineItems = applicationState.line_items;
  const {
    shipping, taxes, discounts, payments,
  } = applicationState;

  const selectedShipping = shipping.selected_shipping ?? {};

  useEffect(() => {
    const subTotalLineItems = lineItems.reduce((acc, curr) => acc + curr.product_data.total_price, 0);
    setSubtotal(subTotalLineItems);
  }, [lineItems]);

  useEffect(() => {
    if (shipping?.selected_shipping?.amount) {
      setShippingTotal(shipping.selected_shipping.amount);
    }
  }, [selectedShipping]);

  useEffect(() => {
    if (discounts[0]?.value) {
      setDiscountTotal(discounts[0].value);
    } else {
      setDiscountTotal(0);
    }
  }, [discounts]);

  useEffect(() => {
    if (taxes && taxes.length) {
      let totalExcludedTaxes = 0;
      let totalIncludedTaxes = 0;
      taxes[0]?.is_included ? setTaxesIncluded(true) : setTaxesIncluded(false);

      taxes.forEach((tax) => {
        if (tax.is_included) {
          totalIncludedTaxes += tax.value;
        } else {
          totalExcludedTaxes += tax.value;
        }
      });
      setIncludedTaxes(totalIncludedTaxes);
      setExcludedTaxes(totalExcludedTaxes);
      const totalTaxes = taxes.reduce((acc, curr) => acc + curr.value, 0);
      setTaxesTotal(totalTaxes);
    }
  }, [taxes]);

  useEffect(() => {
    const totalAmount = subTotal + shippingTotal + excludedTaxes - discountTotal;
    setTotal(totalAmount);
    if (payments.length === 0) {
      setRemainingBalance(totalAmount);
    }
  }, [subTotal, shippingTotal, discountTotal, taxesTotal, excludedTaxes]);

  useEffect(() => {
    if (payments.length > 0) {
      const totalPayments = payments.length === 1 ? payments[0]?.value : payments.reduce((prevVal, currVal) => (prevVal + currVal.value), 0);
      const balance = total - totalPayments;
      setRemainingBalance(balance);
    }
  }, [payments, total]);

  const totalItems = lineItems.reduce((acc, item) => acc + item?.product_data?.quantity, 0);

  return {
    subTotal,
    totalItems,
    shippingTotal,
    discountTotal,
    taxesTotal,
    total,
    taxesIncluded,
    remainingBalance,
  };
};

export default useBreakdown;

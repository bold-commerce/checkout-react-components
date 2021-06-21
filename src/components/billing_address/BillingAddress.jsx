/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import { Address } from '../address';
import useCountryInfo from '../../hooks/useCountryInfo';
import { useBillingAddress } from '../../hooks';
import './BillingAddress.css';

const BillingAddress = ({
  billingAddress, countryInfo, billingAddressErrors, billingSameAsShipping, submitBillingAddress, setBillingSameAsShipping, onChange,
}) => {
  const [address, setAddress] = useState(billingAddress);
  const {
    countries,
    provinces,
    showProvince,
    showPostalCode,
    provinceLabel,
  } = useCountryInfo(countryInfo, address);

  useEffect(() => {
    if (onChange) {
      onChange(address);
    }
  }, [address]);

  return (
    <section className="FieldSet FieldSet--BillingAddress">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Billing address</div>
      </div>
      <div className="FieldSet__Content">
        <RadioField
          label="Same as shipping address"
          name="billing-address"
          className="RadioButton"
          value="SAME_AS_SHIPPING_ADDRESS"
          checked={billingSameAsShipping}
          onChange={() => setBillingSameAsShipping(true)}
        />
        <RadioField
          label="Use a different billing address"
          name="billing-address"
          className="RadioButton"
          value="DIFFERENT_BILLING_ADDRESS"
          checked={!billingSameAsShipping}
          onChange={() => setBillingSameAsShipping(false)}
        />
        { billingSameAsShipping ? null
          : (
            <Address
              address={address}
              onChange={(data) => setAddress({
                ...address,
                ...data,
              })}
              errors={billingAddressErrors}
              countries={countries}
              provinces={provinces}
              showPostalCode={showPostalCode}
              showProvince={showProvince}
              provinceLabel={provinceLabel}
              submit={() => submitBillingAddress(address)}
            />
          )}
      </div>
    </section>
  );
};

BillingAddress.propTypes = {
  billingAddress: PropTypes.any,
  countryInfo: PropTypes.array,
  billingAddressErrors: PropTypes.object,
  billingSameAsShipping: PropTypes.bool,
  submitBillingAddress: PropTypes.func,
  setBillingSameAsShipping: PropTypes.func,
  onChange: PropTypes.func,
};

const MemoizedBillingAddress = React.memo(BillingAddress);

const BillingAddressContainer = ({ onChange }) => {
  const {
    billingAddress, countryInfo, billingAddressErrors, billingSameAsShipping, submitBillingAddress, setBillingSameAsShipping,
  } = useBillingAddress();

  return (
    <MemoizedBillingAddress
      billingAddress={billingAddress}
      countryInfo={countryInfo}
      billingAddressErrors={billingAddressErrors}
      billingSameAsShipping={billingSameAsShipping}
      onChange={onChange}
      submitBillingAddress={onChange || submitBillingAddress}
      setBillingSameAsShipping={setBillingSameAsShipping}
    />
  );
};

BillingAddressContainer.propTypes = {
  onChange: PropTypes.func,
};

export default BillingAddressContainer;

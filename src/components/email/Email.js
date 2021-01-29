import React from 'react';
import { InputField } from '@bold-commerce/stacks-ui';
import useCustomer from '../../hooks/useCustomer';

import './Email.css';

const EmailField = () => {
  const {
    customer, setCustomer, errors, handleSubmit,
  } = useCustomer();

  return (
    <section className="FieldSet FieldSet--CustomerInformation">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Customer information</div>
      </div>
      <div className="FieldSet__Content">
        <InputField
          className="InputField Field--Email"
          placeholder="Email"
          type="email"
          name="email"
          messageType={errors && 'alert'}
          messageText={errors && errors[0].message}
          value={
            customer.email_address ?? ''
          }
          onChange={
            (e) => setCustomer({
              email_address: e.target.value,
            })
          }
          onBlur={
            () => handleSubmit()
          }
        />
      </div>
    </section>
  );
};

export default EmailField;

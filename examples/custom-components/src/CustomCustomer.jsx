import React, { useState } from 'react';
import { useCustomer } from '@boldcommerce/checkout-react-components';
import { InputField } from '@boldcommerce/stacks-ui';

const CustomCustomer = () => {
  const {
    customer, customerErrors, isAuthenticated, submitCustomer,
  } = useCustomer();
  const [email, setEmail] = useState(customer?.email_address);

  return (
    <section className="FieldSet FieldSet--CustomerInformation">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Custom Customer Component</div>
        <p>Custom content for customer componet</p>
      </div>
      <div className="FieldSet__Content">
        <InputField
          className="InputField Field--Email"
          placeholder="Email"
          type="email"
          name="email"
          messageType={customerErrors && 'alert'}
          messageText={customerErrors && customerErrors.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isAuthenticated}
          onBlur={() => submitCustomer({
            email_address: email,
          })}
        />
      </div>
    </section>
  );
};

export default CustomCustomer;

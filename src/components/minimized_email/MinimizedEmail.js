import React from 'react';
import useCustomer from '../../hooks/useCustomer';

const MinimizedEmail = () => {
    const { customer } = useCustomer();
    return (
        <div>
            <span>Email</span>
            <div className="CheckoutStep__FieldSetInfoContainer">
                <span className="CheckoutStep__FieldSetInfo">{customer.email_address}</span>
            </div>
        </div>
    );
}

export default MinimizedEmail;
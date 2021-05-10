import React from 'react';
import useCustomer from '../../hooks/useCustomer';

const MinimizedEmail = ({step, changeButtonText, onChangeStep}) => {
    const { customer, loggedIn} = useCustomer();
    return (
        <>
          <button className="CheckoutStep__ChangeBtn" onClick={() => onChangeStep(step)} >{changeButtonText}</button> {loggedIn && (<span className="CheckoutStep__NotYou">Not you?&nbsp;</span>)} 
            <div className="CheckoutStep__Inner FieldSet">
                <span>Email</span>
                <div className="CheckoutStep__FieldSetInfoContainer">
                    <span className="CheckoutStep__FieldSetInfo">{customer.email_address}</span>
                </div>
            </div>
        </>
    );
}

export default MinimizedEmail;
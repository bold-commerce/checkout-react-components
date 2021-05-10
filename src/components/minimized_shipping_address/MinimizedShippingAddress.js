import React from 'react';
import useShippingAddress from '../../hooks/useShippingAddress';

const MinimizedShippingAddress = ({step, onChangeStep, changeButtonText}) => {
    const { shippingAddress } = useShippingAddress();

    return (
        <>
            <button className="CheckoutStep__ChangeBtn" onClick={() => onChangeStep(step)}>{changeButtonText}</button>
            <div className="CheckoutStep__Inner FieldSet">
                <span>Shipping Address</span>
                <div className="CheckoutStep__FieldSetInfoContainer">
                    <span className="CheckoutStep__FieldSetInfo">{shippingAddress.first_name} {shippingAddress.last_name}</span>
                    <span className="CheckoutStep__FieldSetInfo">{shippingAddress.address_line_1}</span>
                    <span className="CheckoutStep__FieldSetInfo">{shippingAddress.address_line_2}</span>
                    <span className="CheckoutStep__FieldSetInfo">{shippingAddress.city} {shippingAddress.province} {shippingAddress.postal_code}</span>
                    <span className="CheckoutStep__FieldSetInfo">{shippingAddress.country}</span>
                    <span className="CheckoutStep__FieldSetInfo">{shippingAddress.phone_number}</span>
                </div>
            </div>
        </>
    );
}
  
export default MinimizedShippingAddress;
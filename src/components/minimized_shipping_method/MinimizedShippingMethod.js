import React from 'react';
import useShippingLines from '../../hooks/useShippingLines';

const MinimizedShippingMethod = ({step, onChangeStep, changeButtonText}) => {
    const { selectedShipping } = useShippingLines();

    return (
        <>
            <button className="CheckoutStep__ChangeBtn" onClick={() => onChangeStep(step)}>{changeButtonText}</button>
            <div className="CheckoutStep__Inner FieldSet">
                <span>Shipping Method</span>
                <div className="CheckoutStep__FieldSetInfoContainer">
                    <span className="CheckoutStep__FieldSetInfo">{selectedShipping.description} -- {selectedShipping.amount}</span>
                </div>
            </div>
        </>
    );
}
  
export default MinimizedShippingMethod;
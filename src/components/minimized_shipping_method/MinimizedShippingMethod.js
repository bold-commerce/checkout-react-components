import React from 'react';
import useShippingLines from '../../hooks/useShippingLines';

const MinimizedShippingMethod = () => {
    const { selectedShipping } = useShippingLines();

    return (
        <div>
            <span>Shipping Method</span>
            <div className="CheckoutStep__FieldSetInfoContainer">
                <span className="CheckoutStep__FieldSetInfo">{selectedShipping.description} -- {selectedShipping.amount}</span>
            </div>
        </div>
    );
}
  
export default MinimizedShippingMethod;
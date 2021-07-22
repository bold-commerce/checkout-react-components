import React from 'react';
import { Price } from '@boldcommerce/stacks-ui';
import useShippingLines from '../../hooks/useShippingLines';
import PropTypes from 'prop-types';

const MinimizedShippingMethod = ({step, onChangeStep, changeButtonText}) => {
    const { selectedShippingAmount, selectedShippingDescription } = useShippingLines();

    return (
        <>
            <button className="CheckoutStep__ChangeBtn" onClick={() => onChangeStep(step)}>{changeButtonText}</button>
            <div className="CheckoutStep__Inner FieldSet">
                <span>Shipping Method</span>
                <div className="CheckoutStep__FieldSetInfoContainer">
                    <span className="CheckoutStep__FieldSetInfo">{selectedShippingDescription} – <Price amount={selectedShippingAmount}/> </span>
                </div>
            </div>
        </>
    );
}

MinimizedShippingMethod.propTypes = {
    step: PropTypes.number,
    onChangeStep: PropTypes.func,
    changeButtonText: PropTypes.string,
};
  
export default MinimizedShippingMethod;
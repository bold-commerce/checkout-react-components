import React from 'react';
import useCustomer from '../../hooks/useCustomer';
import PropTypes from 'prop-types';

const MinimizedEmail = ({ step, changeButtonText, onChangeStep, isLoggedIn }) => {
    const { customer } = useCustomer();
    return (
        <>
          <button className="CheckoutStep__ChangeBtn" onClick={() => onChangeStep(step)} >{changeButtonText}</button> {isLoggedIn && (<span className="CheckoutStep__NotYou">Not you?&nbsp;</span>)} 
            <div className="CheckoutStep__Inner FieldSet">
                <span>Email</span>
                <div className="CheckoutStep__FieldSetInfoContainer">
                    <span className="CheckoutStep__FieldSetInfo">{customer.email_address}</span>
                </div>
            </div>
        </>
    );
}

MinimizedEmail.propTypes = {
    step: PropTypes.number,
    changeButtonText: PropTypes.string,
    onChangeStep: PropTypes.func,
    isLoggedIn: PropTypes.bool,
};

export default React.memo(MinimizedEmail);
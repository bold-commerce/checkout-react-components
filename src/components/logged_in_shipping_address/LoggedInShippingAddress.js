import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import { withShippingAddressLogic } from '../../../';
import Address from '../address/Address'
import './LoggedInShippingAddress.css';
import CheckoutContext from '../Context';

const AddressData = ({addressInfo}) => {

    return (
        <div className="CheckoutStep__FieldSetInfoContainer">
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.first_name} {addressInfo.last_name}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_1}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.address_line_2}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.city}, {addressInfo.province_code}, {addressInfo.postal_code}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.country}</span>
            <span className="CheckoutStep__FieldSetInfo">{addressInfo.phone_number}</span>
        </div>
    );
}

const LoggedInShippingAddress = ({
    shippingAddresses,
    loadingShippingAddress,
    address,
    dispatch,
    errors,
    countries,
    provinces,
    showPostalCode,
    showProvince,
    updateSelectedShippingAddress,
    provinceLabel,
    submit,
}) => {
    const { isLoading } = useContext(CheckoutContext);

    const submitSelectedAddress = (addr) => {
        dispatch({type:'full_address', payload: addr})
        updateSelectedShippingAddress(addr);
    }
    
    return (
        <>
            <section className="FieldSet FieldSet--ShippingMethod">
            <div className="FieldSet__Header">
                <div className="FieldSet__Heading">Shipping address</div>
                {/* <button className="CheckoutStep__ChangeBtn" onClick={submit} >Done</button> */}
            </div>
                <>
                    <div className="FieldSet__Content">
                        {shippingAddresses && shippingAddresses.map((method, index) => (
                            <div className="RadioButton RadioButton__AddressInfoContainer" key={index}>
                                <RadioField
                                label={<AddressData addressInfo={method} />}
                                name="shipping-address"
                                checked={ address?.id === method?.id }
                                className="RadioField"
                                onChange={() => {
                                submitSelectedAddress(method)
                                }}
                                disabled={ isLoading || loadingShippingAddress }
                                />
                            </div>
                        ))}
                        <div className="RadioButton RadioButton__NewAddressContainer">
                            <RadioField
                            label="Add a new address"
                            name="shipping-address"
                            checked={ address?.id == null }
                            className="RadioField"
                            onChange={() => {
                            dispatch({
                                type: 'id',
                                payload: null
                            });
                            }}
                            disabled={ isLoading || loadingShippingAddress }
                            />
                        </div>
                        { address?.id == null && 
                            ( 
                                <Address
                                    address={address}
                                    dispatch={dispatch}
                                    errors={errors}
                                    countries={countries}
                                    provinces={provinces}
                                    showPostalCode={showPostalCode}
                                    showProvince={showProvince}
                                    provinceLabel={provinceLabel}
                                    submit={submit}
                                />
                            ) 
                        }
                    </div>
                </>
            </section>
        </>
      );
}


LoggedInShippingAddress.propTypes = {
    address: PropTypes.any,
    dispatch: PropTypes.func,
    errors: PropTypes.any,
    submit: PropTypes.func,
  };
  
  export default LoggedInShippingAddress;
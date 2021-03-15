import React, { useState, useCallback } from 'react';
import { Input, Button } from '@boldcommerce/stacks-ui';
import classnames from 'classnames';

const ProductQuantity = ({
  defaultValue,
  onChange,
  readOnly,
}) => {
  const [ value, setValue ] = useState(defaultValue);

  const increment = useCallback(() => {
    setValue(value+1);
    onChange(value+1);
  }, [value, setValue, onChange]);

  const decrement = useCallback(() => {
    setValue(value-1);
    onChange(value-1);
  }, [value, setValue, onChange]);

  const handleChange = useCallback((e) => {
    const { target: { value } } = e;
    setValue(value);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const [ value ] = e.target.value.split('.');
    const num = parseInt(value);

    // Reseting the quantity to previous state if the value entered
    // is invalid
    if (isNaN(num) || num < 1) {
      setValue(defaultValue);
      return;
    }

    setValue(num);
    onChange(num);
  }, [value, onChange, setValue, defaultValue]);

  return (
    <div className="CartItem__ProductQuantityWrapper">
      <div className="ProductQuantity__Decrement">
        {!readOnly && (
          <Button
            children="-"
            disabled={typeof value === 'string' || value <= 1}
            onClick={decrement}
          />
        )}
      </div>
      <div className={classnames('ProductQuantity', {'ProductQuantity--read-only': readOnly})}>
        <Input
          readOnly={readOnly}
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="ProductQuantity__Increment">
        {!readOnly && (
          <Button
            children="+"
            disabled={typeof value === 'string'}
            onClick={increment}
          />
        )}
      </div>
    </div>
  );
}

export default React.memo(ProductQuantity);

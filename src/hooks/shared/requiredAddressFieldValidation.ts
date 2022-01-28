import { Address, CheckoutError } from "../../types";

const requiredAddressFieldValidation = (currAddress: Address, requiredAddressFields: (keyof Address)[]): CheckoutError[] | null => {
  const foundErrors = requiredAddressFields.reduce((result: CheckoutError[], requiredField: keyof Address) => {
    if (!currAddress[requiredField]) {
      result.push({
        field: requiredField,
        message: 'This field is required',
      });
    }
    return result;
  }, []);

  return foundErrors.length ? foundErrors : null;
};

export default requiredAddressFieldValidation;

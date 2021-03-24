import {
  useContext,
  useEffect,
} from 'react';
import CheckoutContext from '../components/Context';

const useTaxes = () => {
  const {
    apiPath,
    csrf,
    selectedShipping,
    taxes,
    setApplicationState,
  } = useContext(CheckoutContext);

  const taxesApplied = taxes.length > 0;
  const shippingID = selectedShipping?.id;

  useEffect(() => {
    if (!csrf) return;

    if (csrf && shippingID) {
      fetch(`${apiPath}/taxes`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setApplicationState(response.data.application_state);
        });
    }
  }, [shippingID]);

  return {
    taxesApplied,
    taxes,
  };
};

export default useTaxes;

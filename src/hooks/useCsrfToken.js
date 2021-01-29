import { useEffect, useState } from 'react';

const useCsrfToken = (apiPath, token) => {
  const [csrf, setCsrf] = useState(null);

  useEffect(() => {
    fetch(`${apiPath}/session/start?token=${token}`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()).then((data) => {
        setCsrf(data.data.csrf_token);
      });
  }, []);

  return csrf;
};

export default useCsrfToken;

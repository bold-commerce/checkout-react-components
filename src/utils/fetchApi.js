import FetchError from './fetchError';

const fetchApi = async (url, options) => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
      ...options,
    });

    const responseData = await response.json();

    if (response.status === 200) {
      return {
        success: true,
        data: responseData.data,
      };
    }

    if (response.status === 422) {
      return {
        success: false,
        error: new FetchError(response.status, 'Invalid request', responseData),
      };
    }

    return {
      success: false,
      error: new FetchError(response.status, 'Something went wrong'),
    };
  } catch (e) {
    return {
      success: false,
      error: new FetchError(500, 'Something went wrong'),
    };
  }
};

export default fetchApi;

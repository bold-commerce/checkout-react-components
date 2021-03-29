/* eslint-disable func-names */
export const debounce = (callback, wait, immediate = false) => {
  let timeout = null;

  return function () {
    const callNow = immediate && !timeout;
    // eslint-disable-next-line prefer-rest-params
    const next = () => callback.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  };
};

export default debounce;

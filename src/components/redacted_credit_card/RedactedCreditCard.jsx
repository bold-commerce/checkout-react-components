import React from 'react';
import PropTypes from 'prop-types';

const RedactedCreditCard = ({ brand, lineText }) => (
  <span className="RedactedCard">
    <span className="RedactedCard__Brand">{brand}</span>
    <span className="RedactedCard__Number">
      {' '}
      &bull;&bull;&bull;&bull;
      {' '}
      &bull;&bull;&bull;&bull;
      {' '}
      &bull;&bull;&bull;&bull;
      {' '}
      {lineText}
    </span>
  </span>
);

RedactedCreditCard.propTypes = {
  brand: PropTypes.string.isRequired,
  lineText: PropTypes.string.isRequired,
};

export default RedactedCreditCard;

import React from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ open, children, className }) => (
  <div style={{ display: open ? '' : 'none' }} className={className}>
    {children}
  </div>
);

Accordion.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Accordion;

import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

const AccordionCollapsed = ({ open, children, className }) => {
  const props = useSpring({
    height: open ? 66 : 0,
    config: {
      duration: 300,
    },
  });
  const height = props.height.interpolate((n) => `${n}vh`);
  return (
    <animated.div style={{ height }} className={className}>
      {children}
    </animated.div>
  );
};

AccordionCollapsed.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default AccordionCollapsed;

import React from 'react';
import './ViewSummary.css'

const ViewSummary = ({ open, children }) => {
  return (
    <div style={{display: open ? 'block' : 'none'}}>
      {children}
    </div>
  );
}

export default ViewSummary

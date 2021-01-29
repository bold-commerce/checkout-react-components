import React from 'react';
import PropTypes from 'prop-types';
import './Branding.css';

const Branding = ({ brandName }) => (
  <section className="FieldSet FieldSet--BrandingInformation">
    <div>
      {brandName}
    </div>
  </section>
);


Branding.propTypes = {
  brandName: PropTypes.string,
};

export default Branding;

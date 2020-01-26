import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './SectionProviderhow.css';

const SectionProviderhow = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      <div className={css.title}>
        <FormattedMessage id="SectionProviderhow.titleLineOne" />
        <br />
        <FormattedMessage id="SectionProviderhow.titleLineTwo" />
      </div>

      <div className={css.steps}>
        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionProviderhow.part1Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionProviderhow.part1Text" />
          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionProviderhow.part2Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionProviderhow.part2Text" />
          </p>
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            <FormattedMessage id="SectionProviderhow.part3Title" />
          </h2>
          <p>
            <FormattedMessage id="SectionProviderhow.part3Text" />
          </p>
        </div>
      </div>
	  
        <NamedLink name="NewListingPage" to={'l/draft/00000000-0000-0000-0000-000000000000/new/description'}
	  		className={css.createListingLink}>
          <FormattedMessage id="SectionProviderhow.createListingLink" />
        </NamedLink>
      
    </div>
  );
};

SectionProviderhow.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionProviderhow.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionProviderhow;

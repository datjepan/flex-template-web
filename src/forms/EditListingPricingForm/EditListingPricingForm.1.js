import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldTextInput, FieldSelect } from '../../components';
import css from './EditListingPricingForm.css';

const { Money } = sdkTypes;

const UNIT_MAX_LENGTH = 60;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = fieldRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );

      const unitRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.unitRequired',
        })
      );

      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}
          <FieldCurrencyInput
            id="price"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage}
            placeholder={pricePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />

          <FieldTextInput
            id="unit"
            name="unit"
            className={css.priceInput}
            type="text"
            label={"Unit"}
            placeholder={"Unit"}
            maxLength={UNIT_MAX_LENGTH}
            // validate={unitRequired}
            autoFocus
          />

          {/*<FieldTextInput
            id="approx_time"
            name="approx_time"
            className={css.priceInput}
            type="text"
            label={"Approximate Time"}
            placeholder={"Approximate Time"}
            maxLength={UNIT_MAX_LENGTH}
            // validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          /> */}

          <FieldSelect id="approx_time" name="approx_time" label="Approximate Time" validate={validators.required('This approximate time is required')}>
            <option value="">Select hour</option>
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="5">5 hours</option>
            <option value="6">6 hours</option>
            <option value="7">7 hours</option>
            <option value="8">8 hours</option>
            <option value="9">9 hours</option>
            <option value="10">10 hours</option>
            <option value="11">11 hours</option>
            <option value="12">12 hours</option>
            <option value="13">13 hours</option>
            <option value="14">14 hours</option>
            <option value="15">15 hours</option>
            <option value="16">16 hours</option>
            <option value="17">17 hours</option>
            <option value="18">18 hours</option>
            <option value="19">19 hours</option>
            <option value="20">20 hours</option>
            <option value="21">21 hours</option>
            <option value="22">22 hours</option>
            <option value="23">23 hours</option>
          </FieldSelect>
				<p className={css.tip}>
                <FormattedMessage id="EditListingPricingForm.Tip" />
              </p>
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);

import { useCheckoutContext } from 'hooks/useCheckoutContext';
import { useCheckout } from 'hooks/useCheckout';

import CheckoutSummary from '../CheckoutSummary';

import { Button, Loader } from 'components/common';

import { BiChevronLeft } from 'react-icons/bi';

import { formatPrice } from 'helpers/format';

import styles from './index.module.scss';

const ShippingOption = () => {
  const { shippingOption } = useCheckoutContext();
  const {
    selectPreviousStep,
    selectShippingOption,
    submitShippingOption,
    isLoading,
  } = useCheckout();

  const expiditedCost = 9000;
  const bussinessCost = 17000;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (shippingOption.standard) {
      submitShippingOption({ shippingOption });
    } else if (shippingOption.expedited) {
      submitShippingOption({ shippingOption, shippingCost: expiditedCost });
    } else {
      submitShippingOption({ shippingOption, shippingCost: bussinessCost });
    }
  };

  return (
    <div className={styles.shipping_option_container}>
      {isLoading && (
        <Loader containerClassName={styles.loader_container} noPortal={true} />
      )}
      {!isLoading && (
        <div className={styles.shipping_option_wrapper}>
          <>
            <CheckoutSummary />
            <h2>Shipping Method</h2>
            <form
              id="form"
              onSubmit={handleSubmit}
              className={styles.shipping_option_form}
            >
              <div>
                <label>
                  <input
                    type="radio"
                    value="standard"
                    checked={shippingOption.standard}
                    onChange={(e) => selectShippingOption(e.target.value)}
                    className={
                      shippingOption.standard
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <span>Standard (3 - 5 Days)</span>
                </label>
                <p>Free</p>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="expedited"
                    checked={shippingOption.expedited}
                    onChange={(e) => selectShippingOption(e.target.value)}
                    className={
                      shippingOption.expedited
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <span>Expedited (2 - 3 Days)</span>
                </label>
                <p>Rp{formatPrice(expiditedCost)}</p>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="bussiness"
                    checked={shippingOption.bussiness}
                    onChange={(e) => selectShippingOption(e.target.value)}
                    className={
                      shippingOption.bussiness
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <span>Bussiness (1 - 2 Days)</span>
                </label>
                <p>Rp{formatPrice(bussinessCost)}</p>
              </div>
            </form>
            <div className={styles.form_controls}>
              <p onClick={selectPreviousStep} className={styles.back}>
                <span>
                  <BiChevronLeft />
                </span>
                Back to information
              </p>
              <Button form="form" type="submit" className={styles.button}>
                Continue to payment
              </Button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default ShippingOption;

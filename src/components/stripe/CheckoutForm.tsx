import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Box, Text, Grid, Button, ModalBody } from '@flexisaf/flexibull2';
import { useEffect, useState } from 'react';
import { errorNotifier } from '../../utils/helpers';

interface ICheckoutForm {
  handleClose: () => void;
  plan: {
    [key: string]: string | null;
  } | null;
}

const CheckoutForm = ({ handleClose, plan }: ICheckoutForm) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentElementLoading, setIsPaymentElementLoading] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (stripe && elements) {
      setIsLoading(true);
      const result = await stripe.confirmPayment({
        elements: elements,
        confirmParams: {
          return_url: `${window.location.href}`,
        },
      });

      if (result.error) {
        setIsLoading(false);
        errorNotifier(
          'An error occurred completing this payment. Please try a different card.'
        );
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPaymentElementLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ModalBody width="400px">
      <Box>
        <Grid default="auto max-content" responsive={false} className="bb">
          <Box pad="24px 32px">
            <Text uppercase bold>
              Subscribe to {plan?.name}
            </Text>
          </Box>
        </Grid>
        <Box pad="32px" width="100%">
          {isPaymentElementLoading ? (
            <Text>Loading Payment Element...</Text>
          ) : (
            <PaymentElement />
          )}
        </Box>
      </Box>
      {!isPaymentElementLoading && (
        <Grid default="auto max-content" responsive={false} className="bt">
          <Box pad="24px">
            <Button
              pale
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Box>
          <Box pad="24px">
            <Button
              onClick={handleSubmit}
              disabled={!stripe}
              progress={isLoading}
            >
              Pay Subscription
            </Button>
          </Box>
        </Grid>
      )}
    </ModalBody>
  );
};

export default CheckoutForm;

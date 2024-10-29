import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckOutFrom from './CheckOutFrom';

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_PK);

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="pay for eat" subHeading="Payment"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                        <CheckOutFrom></CheckOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
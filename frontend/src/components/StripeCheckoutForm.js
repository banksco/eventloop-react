import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { stripePay } from '../actions/orderActions';

const StripeCheckoutForm = ({ order, orderId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const orderStripePay = useSelector((state) => state.orderPay); // Reuse the orderPay reducer for Stripe
    const { loading: stripePayLoading, success: stripePaySuccess, error: stripePayError } = orderStripePay;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: order.user.name,
                    email: order.user.email,
                    address: {
                        line1: order.shippingAddress.address,
                        city: order.shippingAddress.city,
                        postal_code: order.shippingAddress.postalCode,
                        country: order.shippingAddress.country,
                    },
                },
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            // Dispatch the Redux action to make the API call
            dispatch(stripePay(orderId, paymentMethod.id));

        } catch (err) {
            console.error('Error creating Stripe payment method:', err);
            setError('An unexpected error occurred while creating payment method.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <Button type="submit" className="mt-3" disabled={!stripe || loading || stripePayLoading}>
                {loading || stripePayLoading ? <Loader size="sm" /> : 'Pay with Stripe'}
            </Button>
            {error && <Message variant="danger">{error}</Message>}
            {stripePayError && <Message variant="danger">{stripePayError}</Message>}
            {stripePaySuccess && <Message variant="success">Payment successful!</Message>}
        </form>
    );
};

export default StripeCheckoutForm;
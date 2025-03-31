import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetailsActions,
  getPayPalKey,
  payOrder,
} from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { savePaymentMethod } from "../actions/paymentMethodActions";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../components/StripeCheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51R7lemA8NusR6ePEb0kUBLjDVNTMq9V0oQjZ6j4VVbcRmx5sYjlWAMCiyS948HGZcUXvJYcCMI4fiEQo9sPANsr800ncICeDDn"
);
const OrderScreen = () => {
  const params = useParams();
  const orderId = params.id;

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay, paypalKey } = orderPay;

  const paymentMethod = useSelector(
    (state) => state.paymentMethod.paymentMethod
  );
  const [showStripe, setShowStripe] = useState(false);

  let updatedOrder = {};
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    updatedOrder.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    updatedOrder.totalPrice = addDecimals(
      Number(updatedOrder.itemsPrice) +
        Number(order.shippingPrice) +
        Number(order.taxPrice)
    );
  }

  useEffect(() => {
    dispatch(getPayPalKey());
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetailsActions(orderId));
      setShowStripe(false);
    }
  }, [dispatch, orderId, order, successPay]);

  useEffect(() => {
    dispatch(getOrderDetailsActions(orderId));
    if (!paymentMethod) {
      dispatch(savePaymentMethod(""));
    }
  }, [dispatch, orderId, paymentMethod]);

  const handleStripeButtonClick = () => {
    dispatch(savePaymentMethod("Stripe"));
    setShowStripe(true);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod && paymentMethod.paymentMethod
                  ? paymentMethod.paymentMethod
                  : "Not Selected"}
              </p>
              
              {!order.isPaid && paymentMethod.paymentMethod === "Stripe" && (
                <Button onClick={handleStripeButtonClick} className="mb-2">
                  Make Payment now
                </Button>
              )}

              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((event, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={event.image}
                            alt={event.title}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/event/${event.id}`}>{event.title}</Link>
                        </Col>
                        <Col md={4}>
                          {event.qty} x ${event.ticket_price} = $
                          {event.qty * event.ticket_price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {paymentMethod?.paymentMethod === "PayPal" && paypalKey && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <PayPalScriptProvider
                    options={{
                      "client-id": paypalKey,
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "horizontal" }}
                      createOrder={(data, actions) => {
                        return actions.order
                          .create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: order.totalPrice,
                                },
                              },
                            ],
                          })
                          .then((orderId) => {
                            return orderId;
                          });
                      }}
                      onApprove={function (data, actions) {
                        return actions.order.capture().then(function () {

                          var paymentResult = {
                            id: data.paymentID,
                            status: "Paid",
                            update_time: new Date().getDate().toString(),
                            email_address: order.user.email,
                          };
                          dispatch(payOrder(orderId, paymentResult));
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </ListGroup.Item>
              )}
              {paymentMethod.paymentMethod === "Stripe" &&
                stripePromise &&
                order &&
                showStripe && (
                  <ListGroup.Item>
                    <Elements stripe={stripePromise}>
                      <StripeCheckoutForm order={order} orderId={orderId} />
                    </Elements>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;

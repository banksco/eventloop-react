import React, { useEffect } from 'react'
 import { Link, useParams  } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
 import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
 import { useSelector, useDispatch } from 'react-redux'
 import Message from '../components/Message'
 import Loader from '../components/Loader'
import { getOrderDetailsActions, getPayPalKey, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { savePaymentMethod } from '../actions/paymentMethodActions';

 const OrderScreen = () => {
const params = useParams()
const orderId = params.id
  
const dispatch = useDispatch()
    const orderDetails = useSelector((state) => state.orderDetails)
    const {order, loading, error} = orderDetails
  
  const orderPay = useSelector((state) => state.orderPay)
 const {loading: loadingPay, success: successPay, paypalKey} = orderPay
  
    let updatedOrder = {}
    if(!loading){
      const addDecimals = (num) => {
         return (Math.round(num*100)/100).toFixed(2)
       }
   
       updatedOrder.itemsPrice = addDecimals(
         order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
       )
   
       updatedOrder.totalPrice = addDecimals(
         Number(updatedOrder.itemsPrice) +
         Number(order.shippingPrice) + 
         Number(order.taxPrice)
       )    
    }
  
useEffect(() => {
  dispatch(getPayPalKey())
    if (!order || successPay){
      dispatch({type: ORDER_PAY_RESET})
      dispatch(getOrderDetailsActions(orderId))
  }
 },[dispatch, orderId, order, successPay])

 const paymentMethod = useSelector((state) => state.paymentMethod.paymentMethod); 

 useEffect(() => {
   dispatch(getOrderDetailsActions(orderId));
   if (!paymentMethod) {
     dispatch(savePaymentMethod(''));
   }
 }, [dispatch, orderId, paymentMethod]);
  
    return loading ? (
      <Loader />
     ) : error ? (
       <Message variant='danger'>{error}</Message>
     ) : (
       <>
         <h1>Order {order._id}</h1>
         <Row>
           <Col md={8}>
             <ListGroup variant='flush'>
               <ListGroup.Item>
                 <h2>Shipping</h2>
                 <p>
                   <strong>Name: </strong> {order.user.name}
                 </p>
                 <p>
                   <strong>Email: </strong>{' '}
                   <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                 </p>
                 <p>
                   <strong>Address:</strong>
                   {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                   {order.shippingAddress.postalCode},{' '}
                   {order.shippingAddress.country}
                 </p>
                 {order.isDelivered ? (
                   <Message variant='success'>
                     Delivered on {order.deliveredAt}
                   </Message>
                 ) : (
                   <Message variant='danger'>Not Delivered</Message>
                 )}
               </ListGroup.Item>
               <ListGroup.Item>
                 <h2>Payment Method</h2>
                 <p>
                   <strong>Method: </strong>
                   {paymentMethod && paymentMethod.paymentMethod ? paymentMethod.paymentMethod : 'Not Selected'}
                 </p>
                 {order.isPaid ? (
                   <Message variant='success'>Paid on {order.paidAt}</Message>
                 ) : (
                   <Message variant='danger'>Not Paid</Message>
                 )}
               </ListGroup.Item>
               <ListGroup.Item>
                 <h2>Order Items</h2>
                 {order.orderItems.length === 0 ? (
                   <Message>Order is empty</Message>
                 ) : (
                   <ListGroup variant='flush'>
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
                             <Link to={`/event/${event.id}`}>
                               {event.title}
                             </Link>
                           </Col>
                           <Col md={4}>
                             {event.qty} x ${event.ticket_price} = ${event.qty * event.ticket_price}
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
               <ListGroup variant='flush'>
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
                 {!order.isPaid && (
                   <ListGroup.Item>
                     {loadingPay && <Loader />}
                       <PayPalScriptProvider options={{ "client-id": paypalKey,
                       components: "buttons",
                       currency: "USD" }}>
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
                   onApprove={function(data, actions){
                       return actions.order.capture().then(function () {
                        console.log("Approved")
                           var paymentResult = {
                             id: data.paymentID,
                             status: 'Paid',
                             update_time: new Date().getDate().toString(),
                             email_address: order.user.email
                           }
                           dispatch(payOrder(orderId, paymentResult))
                       });
                   }}
                           />
                       </PayPalScriptProvider>
                   </ListGroup.Item>
                 )} 
               </ListGroup>
             </Card>
           </Col>
         </Row>
       </>
    )
  }
  
  export default OrderScreen
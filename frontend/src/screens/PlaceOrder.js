import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Button, Col,Image,Row,ListGroup, Card,
 } from "react-bootstrap";
import { placeOrderActions } from "../actions/orderActions";
import CheckOutSteps from "../components/CheckOutSteps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'


const PlaceOrder = () => {
   const navigate=useNavigate()
  const dispatch = useDispatch();
 
  const { cartEvents } = useSelector((state) => state.selectedEvents);
  const {shippingAddress:sAddress}=useSelector(state=>state.shippingAddress)
  const placedOrder=useSelector(state=>state.placeOrder)

  const updatedCart={}

  const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
  }
  
   updatedCart.shippingAddress=sAddress._id
   updatedCart.itemsPrice=addDecimals(cartEvents.reduce((acc,item)=>acc+item.qty*item.ticket_price,0))
   updatedCart.taxPrice=addDecimals(updatedCart.itemsPrice*0.15)
   updatedCart.shippingPrice=addDecimals(updatedCart.itemsPrice>1000?0:100)
   updatedCart.totalPrice = addDecimals(
    Number(updatedCart.itemsPrice) + 
    Number(updatedCart.shippingPrice) + 
    Number(updatedCart.taxPrice)
  )


  

  const {order}=placedOrder

  useEffect(()=>{
      if (order)
          navigate(`/order/${order.id}`)
  },[dispatch,navigate,order])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(placeOrderActions({
  
    
      orderItems: cartEvents, 
       

      itemsPrice:updatedCart.itemsPrice,
    taxPrice:updatedCart.taxPrice,
    shippingAddress:sAddress._id,
    shippingPrice:updatedCart.shippingPrice,
    totalPrice:updatedCart.totalPrice,
    }));


  };

  return (
    <>
    <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
    <Row>
<Col md={8}>
<ListGroup variant='flush'>
            {cartEvents.map((event) => (
              <ListGroup.Item key={event.id}>
                <h3>Order Items</h3>
                <Row>
                <Col md={2}>
                    <Image src={event.image} alt={event.title} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/event/${event.id}`}>{event.title}</Link>
                  </Col>
                  <Col md={2}>${event.ticket_price} * ${event.qty}=${event.ticket_price*event.qty}</Col>
                
                </Row>
              </ListGroup.Item>
            ))}

<ListGroup.Item>
               <h2>Shipping</h2>
               <p>
                 <strong>Address:</strong>
                 {sAddress.address}, {sAddress.city}{' '}
                 {sAddress.postalCode},{' '}
                 {sAddress.country}
               </p>
             </ListGroup.Item>
             {/* <ListGroup.Item>
               <h2>Payment Method</h2>
               <strong>Method: </strong>
               {paymentMethod}
             </ListGroup.Item> */}

            
          </ListGroup>
      </Col>

      <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>Ticket Summary</ListGroup.Item>

              </ListGroup>
              <ListGroup.Item>
                 <Row>
                   <Col>Items</Col>
                   <Col>${updatedCart.itemsPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col>Tax</Col>
                   <Col>${updatedCart.taxPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col>Shipping</Col>
                   <Col>${updatedCart.shippingPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row>
                   <Col>Total</Col>
                   <Col>${updatedCart.totalPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                <Col></Col>
                <Col>
                 <Button disabled={cartEvents===0} onClick={submitHandler} type='button'
                   className='btn-block'>
                  Place Order
                 </Button>
                 </Col>
               </ListGroup.Item>


            </Card>

      </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;

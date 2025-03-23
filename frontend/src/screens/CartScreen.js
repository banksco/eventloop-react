import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addEventToCart, removeEventFromCart } from "../actions/cartActions";
import { useLocation, useParams, useNavigate, Link  } from "react-router-dom";
import Message from "../components/Message";
import {Row,Col, ListGroup, Image, Form, Card, Button } from 'react-bootstrap'
import { getShippingAddress } from "../actions/shippingActions";


const CartScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const id = params.id;
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if(id){
      dispatch(addEventToCart(id, qty))
    }
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.selectedEvents)
  const { cartEvents } = cart
  const removeEventFromCartHandler = (id) => {
    dispatch(removeEventFromCart(id))
  }
  const {userInfo}=useSelector(state=>state.userLogin)
  const checkoutHandler = () => {
    if(userInfo){
    navigate('/login?redirect=/shipping')
   dispatch(getShippingAddress())
    }
    else
    navigate('/login')
  }

  return (
    <Row> 
    <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartEvents.length === 0 ? (
        <Message>
          Your Cart is Empty. <Link to="/">Check Out Local Events.</Link>
        </Message>
      ) : (
    <ListGroup variant='flush'>
            {cartEvents.map((event) => (
              <ListGroup.Item key={event.id}>
                <Row>
                <Col md={2}>
                    <Image src={event.image} alt={event.title} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/event/${event.id}`}>{event.title}</Link>
                  </Col>
                  <Col md={2}>${event.ticket_price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={event.qty}
                      onChange={(e) =>
                        dispatch(
                          addEventToCart(event.id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeEventFromCartHandler(event.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartEvents.reduce((acc, event) => acc + event.qty, 0)})
                items
              </h2>
              $
              {cartEvents
                .reduce((acc, event) => acc + event.qty * event.ticket_price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartEvents.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>      
      </Col>

   </Row>
  )
}
  /* < <>
      
    </>>
  )*/


export default CartScreen;

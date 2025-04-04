import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Container, ListGroupItem} from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom'
import {Row, Col, Image, Card, Button, ListGroup,Form} from 'react-bootstrap'
import GMap from '../components/GMap';
import { listEventDetails } from '../actions/eventActions';
import Loader from '../components/Loader';
import Message from '../components/Message';



const EventScreen = () => {
  const params = useParams ()
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [qty,setQty]=useState(1)
useEffect(() => {
  dispatch(listEventDetails(params.id))
}, [dispatch, params])

const eventDetails = useSelector((state) => state.eventDetails)
const {loading, event, error} = eventDetails
const buyTicketHandler=()=>{
navigate(`/cart/${params.id}?qty=${qty}`)
}

/* Event detail card components */
  return (
    <>
    <Container>
    <Link className= 'btn btn-light my-3' to='/'>
    Go Back
   </Link>
   {loading?(<Loader/>):
        error ?(<Message variant='info'>{error}</Message>):
        (<>
          <Row>
  
          <Image src={event.image} alt='{event.name}' style={{ width: '100%', height: 'auto', objectFit: 'cover' ,display: 'block', margin: '0 auto' }}/>
          
         </Row>
         <Row>
          <Col md={6}>
          <Card>
          <ListGroup variant='flush'>
          <Card.Body>
            <Card.Title>
      
                    <h3>{event.title}</h3>
      
            </Card.Title>
      
            <Card.Text>
                  <ListGroup.Item>Price: ${event.ticket_price}</ListGroup.Item>
                  <ListGroup.Item>Description: {event.description}</ListGroup.Item>
                  <ListGroup.Item>Date: {event.date}</ListGroup.Item>
                  <ListGroup.Item>Time: {event.time}</ListGroup.Item>
                  <ListGroup.Item>Category: {event.category}</ListGroup.Item>
                  <ListGroup.Item>Status: {event.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</ListGroup.Item>
                  {event.countInStock>0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>no of tickets:</Col>
                      </Row>
                      <Col>
                        <Form.Control as ="select" value={qty} onChange={e=>setQty(e.target.value)}>
                            {
                              [...Array(10).keys()].map(x=>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                              ))
                            }
                        </Form.Control>
                      </Col>
                    </ListGroupItem>                  )}
                  
                  </Card.Text>
                  </Card.Body>
                </ListGroup>
                
                </Card>
          </Col>
      
          <Col md={6}>
          <Card>
      <Card.Body>
        <Card.Title><h3>Purchase Tickets</h3></Card.Title>
        <Card.Text>
        <Button
                        className='btn-block'
                        type='button'
                        onClick={buyTicketHandler}
                        disabled={event.countInStock === 0}
                      >
                        BUY TICKETS
                      </Button>
        </Card.Text>
      
                      
                      <GMap />
                      
      </Card.Body>
         
                      
                      
                      </Card>
          </Col>
      
         </Row>
         </>
        )
    }



   </Container>
   </>
  )
}

export default EventScreen
import React from 'react'
import {Container} from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom'
import {Row, Col, Image, Card, Button, ListGroup} from 'react-bootstrap'
import Events from '../Events'
import GMap from '../components/GMap';


const EventScreen = () => {
  const params = useParams ()
  const event = Events.find(p =>p.id === params.id)


  return (
    <>
    <Container>
    <Link className= 'btn btn-light my-3' to='/'>
    Go Back
   </Link>
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
                  disabled={event.tickets_available === 0}
                >
                  Add To Cart
                </Button>
  </Card.Text>

                
                <GMap />
                
</Card.Body>
   
                
                
                </Card>
    </Col>

   </Row>


   </Container>
   </>
  )
}

export default EventScreen
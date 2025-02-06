import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {Row, Col, Image, Card, Button, ListGroup} from 'react-bootstrap'
import Events from '../Events'

const EventScreen = () => {
  const params = useParams ()
  const event = Events.find(p =>p.id === params.id)


  return (
    <>
    <Link className= 'btn btn-light my-3' to='/'>
    Go Back
   </Link>
   <Row>
    <Image src={event.image} alt='{event.name}' fluid />
   </Row>
   <Row>
    <Col md={6}>
    <Card>
    <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{event.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${event.ticket_price}</ListGroup.Item>
            <ListGroup.Item>Description: {event.description}</ListGroup.Item>
          </ListGroup>
          </Card>
    </Col>

    <Col md={6}>
    <Card>
    <Button
                  className='btn-block'
                  type='button'
                  disabled={event.tickets_available === 0}
                >
                  Add To Cart
                </Button>
                </Card>
    </Col>

   </Row>



   </>
  )
}

export default EventScreen
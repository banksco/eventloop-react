import React from 'react'
import {Card} from 'react-bootstrap'



const Event = ({event}) => {
  return (
    <>
    <br></br>
    <Card>
      <Link to={`/event/${event.id}`}>
      <Card.Img variant="top" src={event.image}style={{ width: '100%', height: 'auto', objectFit: 'cover' ,display: 'block', margin: '0 auto' }}/>
      </Link>
      <Card.Body>
      <Link to={`/event/${event.id}`}>
        <Card.Title>{event.title}</Card.Title>
        </Link>
        <Card.Text>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' ,weekday:'short'}).format(new Date(event.date))}</Card.Text>
        {/*<Card.Text>{new Date(event.date).toLocaleDateString()}</Card.Text>*/}
        <Card.Text>{event.time}</Card.Text>
        <Follower followers={event.followers}></Follower>
      </Card.Body>
    </Card> 
    
    
    
    </>
  )
}

export default Event
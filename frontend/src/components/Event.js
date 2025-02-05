import React from 'react'
import {Card} from 'react-bootstrap'
import Follower from './Follower'



const Event = ({event}) => {
  return (
    <>
    
    <Card> 
      <Card.Img variant="top" src={event.image}style={{ width: '300px', height: '200px', objectFit: 'cover' ,display: 'block', margin: '0 auto' }}/>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' ,weekday:'long'}).format(new Date(event.date))}</Card.Text>
        {/*<Card.Text>{new Date(event.date).toLocaleDateString()}</Card.Text>*/}
        <Card.Text>{event.time}</Card.Text>
        <Follower followers={event.followers}></Follower>
      </Card.Body>
    </Card> 
    
    
    
    </>
  )
}

export default Event
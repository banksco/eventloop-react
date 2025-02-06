import React from 'react'
import events from '../Events'
import {Col,Row,Button} from 'react-bootstrap'
import Event from '../components/Event'
import {Link} from 'react-router-dom'
const HomeScreen = () => {
  return (
    <>
    <Row className='styleCategory'>
    <Col md={3}>
    <Link to="/category/Technology">
    <Button variant="primary" size="lg" active>
        Technology
      </Button></Link></Col>
      <Col md={3}>
    <Link to="category/Music & Dance"><Button variant="primary" size="lg" active>
        Music & Dance
      </Button></Link></Col>
      <Col md={3}>
    <Link to="category/Art"><Button variant="primary" size="lg" active>
        Art
      </Button></Link></Col>
      <Col md={3}>
    <Link to="category/Food & Drink"><Button variant="primary" size="lg" active>
        Food & Drink
      </Button></Link></Col>
    </Row>
    
    <Row  >
        
        {events.map(e=>(
                 
                <Col sm={12} lg={4} md={6} xl={3}>
                    <Event event={e}></Event>

                </Col>
        ))
        }
    </Row>
    
    </>
  )
}

export default HomeScreen
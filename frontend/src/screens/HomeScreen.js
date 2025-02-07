import React from 'react'
import events from '../Events'
import {Col,Row} from 'react-bootstrap'
import Event from '../components/Event'
import HeroSlider from '../components/HeroSlider'
const HomeScreen = () => {
  return (
    <>
    <Row>
      <HeroSlider />
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
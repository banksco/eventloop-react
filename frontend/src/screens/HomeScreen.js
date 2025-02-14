import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Col,Row} from 'react-bootstrap'
import Event from '../components/Event'
import HeroSlider from '../components/HeroSlider'

const HomeScreen = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {

    const fetchEvents = async () => {
      const {data} = await axios.get('/api/events')
      setEvents(data)

    }
    fetchEvents()
  })

  return (
    <>
    <Row>
    {/* Carousel Component*/}
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
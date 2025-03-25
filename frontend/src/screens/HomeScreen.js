import React, {useEffect} from 'react'

import {Col,Row} from 'react-bootstrap'
import Event from '../components/Event'
import HeroSlider from '../components/HeroSlider'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllEvents } from '../actions/eventActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserProfileInfo } from '../actions/userActions'

const HomeScreen = () => {
const dispatch=useDispatch()
useEffect(() => {
  dispatch(fetchAllEvents())
  dispatch(getUserProfileInfo())

},[dispatch])


const eList=useSelector(state=>state.eventList)

const {loading,events,error}=eList

return (
  <>
  <Row>
  {/* Carousel Component*/}
    <HeroSlider />
  </Row>
  <Row  >
      {loading?(<Loader/>):
        error ?(<Message variant='info'>{error}</Message>):
      events.map(e=>(
                
              <Col key= {e.id} sm={12} lg={4} md={6} xl={3}>
                  <Event event={e}></Event>

              </Col>
      ))
      }
  </Row>
  
</>
)
}

export default HomeScreen
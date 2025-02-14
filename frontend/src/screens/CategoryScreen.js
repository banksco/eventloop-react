import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams,Link } from 'react-router-dom'
import {Row,Col } from 'react-bootstrap'

import Event from '../components/Event';

const CategoryScreen = () => {


    const params= useParams();

    const[events,setEvents]=useState([])

    useEffect(()=>{
      const fetchEvents= async()=>{
         const {data}=await axios.get(`/api/category/${params.categ}`)
         setEvents(data)
      }


      fetchEvents()

    })
    
    



  return (
   <>
   
   <Link to="/" className= 'btn btn-light my-3'>Go Back</Link>
   
   <Row className='text-center'>
    <h1>{params.categ}</h1>
    
   </Row>
   <Row>
    {

      /*Filter method returns an array of objects*/
      /*storing the output in local array is not possible */
             events.map(e=>
            <Col sm={12} lg={4} md={6} xl={3}>
            <Event event={e}/></Col>
        )
        
    }
    
   </Row>
   </>
  )
}

export default CategoryScreen
import React from 'react'
import Events from '../Events'
import { useParams,Link } from 'react-router-dom'
import {Row,Col } from 'react-bootstrap'

import Event from '../components/Event';

const CategoryScreen = () => {
console.log("in category screen")

    const params= useParams();
    console.log(params.categ);
    



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
             Events.filter(e=>e.category===params.categ).map(e=>
            <Col sm={12} lg={4} md={6} xl={3}>
            <Event event={e}/></Col>
        )
        
    }
    
   </Row>
   </>
  )
}

export default CategoryScreen
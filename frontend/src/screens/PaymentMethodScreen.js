import React, { useState, useEffect } from 'react'
 import { Form, Button, Col } from 'react-bootstrap'
 import { useDispatch, useSelector } from 'react-redux'
 import { useNavigate } from 'react-router-dom'
 import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
 import { savePaymentMethod } from '../actions/paymentMethodActions'

 const PaymentMethodScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {shippingAddress} = useSelector((state) => state.shippingAddress)

// useEffect to redirect to shipping 
useEffect(() => {
  if (!shippingAddress) {
    navigate('/shipping')
  }
}, [shippingAddress, navigate])
  

  const [paymentMethod, setPaymentMethod] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  
  return (
    <FormContainer>
       <CheckOutSteps step1 step2 step3 />
       <h1>Payment Method</h1>
       <Form onSubmit={submitHandler}>
         <Form.Group>
           <Form.Label as='legend'>Select Method</Form.Label>
           <Col>
             <Form.Check
               type='radio'
               label='PayPal or Credit Card'
               id='PayPal'
               name='paymentMethod'
               value='PayPal'
              checked = {paymentMethod === 'PayPal'}
               onChange={(e) => setPaymentMethod(e.target.value)}
             ></Form.Check>
            <Form.Check
               type='radio'
               label='Stripe'
               id='Stripe'
               name='paymentMethod'
               value='Stripe'
               checked = {paymentMethod === 'Stripe'}
               onChange={(e) => setPaymentMethod(e.target.value)}
             ></Form.Check> 
           </Col>
         </Form.Group>
         <Button type='submit' variant='primary'>
           Continue
         </Button>
       </Form>
     </FormContainer>
  )
}

export default PaymentMethodScreen
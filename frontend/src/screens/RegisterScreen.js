import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button,Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { newUserRegistration } from '../actions/userActions'

const RegisterScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [passwordError,setPasswordError]=useState('')
    
    const redirect=location.search?location.search.split('=')[1]:'/'
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setPasswordError('Passwords do not match')
           
        }
        else{
            setPasswordError('')
            dispatch(newUserRegistration({name,email,password}))
            navigate(redirect)
        }
    }

  return (
    <>
    <FormContainer>
        <Form>
        <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" required value={name} onChange={e=>setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@gmail.com"  required value={email} onChange={e=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your Password" required value={password} onChange={e=>setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password-2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
      </Form.Group>
        {passwordError?<h6>{passwordError}</h6>:''}
      <Button onClick={submitHandler}>Submit</Button>

        </Form>

    </FormContainer>
    </>
  )
}

export default RegisterScreen
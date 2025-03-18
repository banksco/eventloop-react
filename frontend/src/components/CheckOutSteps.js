import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const CheckOutSteps = ({step1,step2,step3,step4}) => {
  return (
   <>
   <Nav className="justify-content-center" variant="underline">
        <Nav.Item>
          {step1?(<Nav.Link as={Link} to='/login'>Login</Nav.Link>):(<Nav.Link disabled>Login</Nav.Link>)}
        </Nav.Item>
        <Nav.Item>
        {step2?(<Nav.Link as={Link} to='/shipping'>Shipping</Nav.Link>):(<Nav.Link disabled>Shipping</Nav.Link>)}
        </Nav.Item>
        <Nav.Item>
        {step3?(<Nav.Link as={Link} to='/payment'>Payment</Nav.Link>):(<Nav.Link disabled>Payment</Nav.Link>)}
        </Nav.Item>
        <Nav.Item>
          {step4?(<Nav.Link as={Link} to='/order'>Buy Tickets</Nav.Link>):(<Nav.Link disabled>Buy Tickets</Nav.Link>)}
          
        </Nav.Item>
      </Nav>
   </>
  )
}

export default CheckOutSteps
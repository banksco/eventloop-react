import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Login } from "../actions/userActions";


const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Login(email, password));
   
  };
  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Button type="submit" onClick={submitHandler}>
              Sign In
            </Button>
            <Form.Group className="mb-3">
            <Form.Label>new user ?<Link to={redirect? `/register?redirect=${redirect}`:'/register'}>Register</Link></Form.Label>
            </Form.Group></Form>
        )}
      </FormContainer>
    </>
  );
};

export default LoginScreen;

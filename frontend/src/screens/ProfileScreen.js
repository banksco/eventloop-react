import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileInfo } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ListGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import {Row,Col,Image} from 'react-bootstrap'


const ProfileScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in useEffect")
    dispatch(getUserProfileInfo());
  }, [dispatch]);

  const userProfile= useSelector((state) => state.userProfile);
  const {loading,profile,error}=userProfile
  if(profile){

  }
  
  return (
    <>
{ 
loading ?(<Loader></Loader>): error ?(<Message>{error}</Message>): (
      <>
        <FormContainer>
          <ListGroup>
            <ListGroup.Item>
              <h1>User Details</h1>
              <p>Name : {profile.user.name}</p>
              <p>Email : {profile.user.email}</p>
              <p> {profile.user.isAdmin? "Admin" : "Not an Admin"}</p>

            </ListGroup.Item>
            <ListGroup.Item>
            {profile.order.orderItems.map((event) => (
              <ListGroup.Item key={event._id}>
                <h1>Order Items</h1>
                <Row>
                <Col md={2}>
                    <Image src={event.image} alt={event.title} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/event/${event._id}`}>{event.title}</Link>
                  </Col>
                  <Col md={2}>${event.ticket_price} * ${event.qty}=${event.ticket_price*event.qty}</Col>
                    <Col md={1}>${event.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            ))}

            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {profile.shippingAddress.address}, {profile.shippingAddress.city} {profile.shippingAddress.postalCode},{" "}
                {profile.shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </FormContainer>
      </>
      )
    }

    
     
    </>
  );
};

export default ProfileScreen;

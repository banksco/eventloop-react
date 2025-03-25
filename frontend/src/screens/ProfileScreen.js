import React from "react";
import { useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { Link } from "react-router-dom";
import {Row,Col,Image} from 'react-bootstrap'


const ProfileScreen = () => {

  const userProfile= useSelector((state) => state.userProfile);
  const {loading,profile,error}=userProfile
  const orderItems = profile?.order?.orderItems;
  
  return (
    <>
{ 
loading ?(<Loader></Loader>): error ?(<Message>{error}</Message>): (
      <>
       
          <ListGroup>
            <ListGroup.Item>
              <h1>User Details</h1>
              <p>Name : {profile.user.name}</p>
              <p>Email : {profile.user.email}</p>
              <p> {profile.user.isAdmin? "Admin" : "Not an Admin"}</p>

           </ListGroup.Item>

            <ListGroup.Item disabled={!orderItems }>
            {orderItems && orderItems.length > 0 ? (orderItems.map((event) => (
              <ListGroup.Item key={event._id}>
                <h1>Order Items</h1>
                <Row>
                <Col md={2}>
                    <Image src={event.image} alt={event.title} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/event/${event.id}`}>{event.title}</Link>
                  </Col>
                  <Col md={2}>${event.ticket_price} * ${event.qty}=${event.ticket_price*event.qty}</Col>
                    
                </Row>
              </ListGroup.Item>))):(<p>No order Found</p>)
            }
            <ListGroup.Item>Total Price:${profile.order.totalPrice}</ListGroup.Item>

            </ListGroup.Item>

            <ListGroup.Item disabled={!profile?.shippingAddress}>
              {profile?.shippingAddress ?(<><h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {profile.shippingAddress.address}, {profile.shippingAddress.city} {profile.shippingAddress.postalCode},{" "}
                {profile.shippingAddress.country}
              </p></>):(<p>No shipping Address found</p>)}
            </ListGroup.Item>
          </ListGroup>
        
      </>
      )
    }

    
     
    </>
  );
};

export default ProfileScreen;

import React, { useState, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Navigate } from "react-router-dom"; 

const UpdateProfileScreen = () => {
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, profile, error } = userProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [redirect, setRedirect] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setName(profile.user.name);
      setEmail(profile.user.email);
      if (profile.shippingAddress) {
        setAddress({
          address: profile.shippingAddress.address,
          city: profile.shippingAddress.city,
          postalCode: profile.shippingAddress.postalCode,
          country: profile.shippingAddress.country,
        });
      }
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "address" || name === "city" || name === "postalCode" || name === "country") {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    } else {
      if (name === "name") setName(value);
      if (name === "email") setEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name,
      email,
      shippingAddress: address,
    };
    dispatch(updateUserProfile(updatedProfile)); 
    setRedirect(true); 
  };

 
  if (redirect) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <h1>Update Profile</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>

              <h2>Shipping Address</h2>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  value={address.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your postal code"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your country"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default UpdateProfileScreen;
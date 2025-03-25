import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/shippingActions";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.shippingAddress);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress]); 

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      shippingAddress?.address !== address ||
      shippingAddress?.city !== city ||
      shippingAddress?.postalCode !== postalCode ||
      shippingAddress?.country !== country
    ) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
    }
    navigate("/placeorder");
  };

  return (
    <>
      <FormContainer>
        <CheckOutSteps step1 step2></CheckOutSteps>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          
          <Button type="submit">Continue</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
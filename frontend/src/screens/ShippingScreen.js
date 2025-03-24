import React, { useState } from "react";
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

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    //if shipping address already exists in db and you want to use that -->continue to payment

    if (
      shippingAddress.address !== address ||
      shippingAddress.city !== city ||
      shippingAddress.postalCode !== postalCode ||
      shippingAddress.country !== country
    ) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
    } else {
      navigate("/placeorder");
    }
  };

  return (
    <>
      <FormContainer>
        <CheckOutSteps step1 step2></CheckOutSteps>
        <Form>
          <Form.Group className="mb-3" controlID="address">
            <Form.Label>Address</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlID="city">
            <Form.Label>City</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter address"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlID="postalCode">
            <Form.Label>Postal code</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlID="country">
            <Form.Label>Country</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" onClick={submitHandler}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;

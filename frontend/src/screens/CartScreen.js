import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventToCart } from "../actions/cartActions";
import { useLocation, useParams, Link } from "react-router-dom";
import Message from "../components/Message";

const CartScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const id = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    dispatch(addEventToCart(id, qty));
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.selectedEvents);
  const { cartEvents } = cart;

  return (
    <>
      {cartEvents.length === 0 ? (
        <Message>
          Buy Tickets<Link to="/">Home</Link>
        </Message>
      ) : (
        cartEvents.map((x) => <h1>{x.id}</h1>)
      )}
    </>
  );
};

export default CartScreen;

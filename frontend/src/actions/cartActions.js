import axios from "axios";
import { CART_ADD_EVENT, CART_REMOVE_EVENT } from "../constants/cartConstants";

export const addEventToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/events/${id}`);

  dispatch({
    type: CART_ADD_EVENT,
    payload: {
      id: data._id,
      title: data.title,
      date: data.date,
      time: data.time,
      location: data.location,
      ticket_price: data.ticket_price,
      qty,
    },
  });

  localStorage.setItem(
    "cartEvents",
    JSON.stringify(getState().selectedEvents.cartEvents)
  );
};

export const removeEventFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_EVENT,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().selectedEvents.cartEvents)
  );
};

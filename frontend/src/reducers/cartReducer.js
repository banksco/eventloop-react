import { CART_ADD_EVENT, CART_REMOVE_EVENT } from "../constants/cartConstants";

export const cartReducer = (state = { cartEvents: [] }, action) => {
  switch (action.type) {
    case CART_ADD_EVENT: {
      const event = action.payload;

      const exist_event = state.cartEvents.find((x) => x.id === event.id);

      if (exist_event) {
        event.qty = event.qty + exist_event.qty;
        return {
          ...state,
          cartEvents: state.cartEvents.map((x) =>
            x.id === event.id ? event : x
          ),
        };
      } else {
        return {
          ...state,
          cartEvents: [...state.cartEvents, event],
        };
      }
    }
    case CART_REMOVE_EVENT: {
      return {
        ...state,
        cartEvents: state.cartEvents.filter((x) => x.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

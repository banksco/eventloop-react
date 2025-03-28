// action will get users payment information 
import axios from 'axios';
import { PAYMENT_METHOD_DELETE, PAYMENT_METHOD_SAVE } from '../constants/paymentMethodConstants';

export const savePaymentMethod = (paymentMethod) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, 
      },
    };

    // paymentMethod Selection Verification
    if (!paymentMethod) {
      throw new Error('Please select a payment method');
    }

    const { data } = await axios.post('/api/users/savePaymentMethod', { paymentMethod }, config);


    
    dispatch({
      type: PAYMENT_METHOD_SAVE,
      payload: data,
    });

    // Save to localStorage
    localStorage.setItem('paymentMethod', JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: 'PAYMENT_METHOD_ERROR',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete from ls
export const deletePaymentMethod=()=>(dispatch)=>{
    dispatch({
        type:PAYMENT_METHOD_DELETE,
        
    })

    localStorage.removeItem('paymentMethod')

}
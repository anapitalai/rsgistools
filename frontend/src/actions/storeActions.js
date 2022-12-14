import axios from 'axios'
import {


  STORE_CREATE_REQUEST,
  STORE_CREATE_SUCCESS,
  STORE_CREATE_FAIL,
} from '../constants/storeConstants'
import { logout } from './userActions'

export const createStore = (image) => async (dispatch) => {
  try {
    dispatch({
      type: STORE_CREATE_REQUEST,
    })


    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/stores`, {image}) //,config removed

    dispatch({
      type: STORE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_CREATE_FAIL,
      payload: message,
    })
  }
}


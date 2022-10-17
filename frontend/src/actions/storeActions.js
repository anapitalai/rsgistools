import axios from 'axios'
import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
  // PRODUCT_DETAILS_REQUEST,
  // PRODUCT_DETAILS_SUCCESS,
  // PRODUCT_DETAILS_FAIL,
  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_REQUEST,
  // PRODUCT_DELETE_FAIL,
  STORE_CREATE_REQUEST,
  STORE_CREATE_SUCCESS,
  STORE_CREATE_FAIL,

  // PRODUCT_UPDATE_REQUEST,
  // PRODUCT_UPDATE_SUCCESS,
  // PRODUCT_UPDATE_FAIL,
  // PRODUCT_CREATE_REVIEW_REQUEST,
  // PRODUCT_CREATE_REVIEW_SUCCESS,
  // PRODUCT_CREATE_REVIEW_FAIL,
  // PRODUCT_TOP_REQUEST,
  // PRODUCT_TOP_SUCCESS,
  // PRODUCT_TOP_FAIL,
} from '../constants/storeConstants'
import { logout } from './userActions'

export const listStores = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: STORE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/stores?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: STORE_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: STORE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}




export const createStore = (storeId,address,latitude,longitude) => async (dispatch) => {
  try {
    dispatch({
      type: STORE_CREATE_REQUEST,
    })


    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/stores`, {storeId,address,latitude,longitude}) //,config removed

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


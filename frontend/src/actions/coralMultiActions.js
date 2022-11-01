import axios from 'axios'
import {
  CORALMULTI_LIST_REQUEST,
  CORALMULTI_LIST_SUCCESS,
  CORALMULTI_LIST_FAIL,

  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_REQUEST,
  // PRODUCT_DELETE_FAIL,
  CORALMULTI_CREATE_REQUEST,
  CORALMULTI_CREATE_SUCCESS,
  CORALMULTI_CREATE_FAIL,

  // PRODUCT_UPDATE_REQUEST,
  // PRODUCT_UPDATE_SUCCESS,
  // PRODUCT_UPDATE_FAIL,
  // PRODUCT_CREATE_REVIEW_REQUEST,
  // PRODUCT_CREATE_REVIEW_SUCCESS,
  // PRODUCT_CREATE_REVIEW_FAIL,
  // PRODUCT_TOP_REQUEST,
  // PRODUCT_TOP_SUCCESS,
  // PRODUCT_TOP_FAIL,
} from '../constants/coralMultiConstants'
import { logout } from './userActions'

export const listCoralMultis = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: CORALMULTI_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/multipolygon`
    )

    dispatch({
      type: CORALMULTI_LIST_SUCCESS,
      payload: data, 
    })
//logger 
    // console.log('DB coral data',data.corals[0].features[0].properties.coralId)
    console.log('DB',data.corals)

  } catch (error) {
    dispatch({
      type: CORALMULTI_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}







//multipolygon add
export const createCoralMultipolygon = (features) => async (dispatch) => {
  try {
    dispatch({
      type: CORALMULTI_CREATE_REQUEST,
    })


    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/multipolygon`, {features},config)

    dispatch({
      type: CORALMULTI_CREATE_SUCCESS,
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
      type: CORALMULTI_CREATE_FAIL,
      payload: message,
    })
  }
}


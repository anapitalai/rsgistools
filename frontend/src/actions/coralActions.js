import axios from 'axios'
import {
  CORAL_LIST_REQUEST,
  CORAL_LIST_SUCCESS,
  CORAL_LIST_FAIL,
  CORAL_DETAILS_REQUEST,
  CORAL_DETAILS_SUCCESS,
  CORAL_DETAILS_FAIL,
  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_REQUEST,
  // PRODUCT_DELETE_FAIL,
  CORAL_CREATE_REQUEST,
  CORAL_CREATE_SUCCESS,
  CORAL_CREATE_FAIL,

  // PRODUCT_UPDATE_REQUEST,
  // PRODUCT_UPDATE_SUCCESS,
  // PRODUCT_UPDATE_FAIL,
  // PRODUCT_CREATE_REVIEW_REQUEST,
  // PRODUCT_CREATE_REVIEW_SUCCESS,
  // PRODUCT_CREATE_REVIEW_FAIL,
  // PRODUCT_TOP_REQUEST,
  // PRODUCT_TOP_SUCCESS,
  // PRODUCT_TOP_FAIL,
} from '../constants/coralConstants'
import { logout } from './userActions'

export const listCorals = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: CORAL_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/corals`
    )

    dispatch({
      type: CORAL_LIST_SUCCESS,
      payload: data, 
    })
//logger 
    // console.log('DB coral data',data.corals[0].features[0].properties.coralId)
    console.log('DB',data.corals)

  } catch (error) {
    dispatch({
      type: CORAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}





export const listCoralDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CORAL_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/corals/${id}`)

    dispatch({
      type: CORAL_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CORAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const createCoral = (coralId,coralArea,coordinates) => async (dispatch) => {
  try {
    dispatch({
      type: CORAL_CREATE_REQUEST,
    })


    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/corals`, {coralId,coralArea,coordinates},config)

    dispatch({
      type: CORAL_CREATE_SUCCESS,
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
      type: CORAL_CREATE_FAIL,
      payload: message,
    })
  }
}


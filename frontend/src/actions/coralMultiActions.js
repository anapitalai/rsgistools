import axios from 'axios'
import {
  CORALMULTI_LIST_REQUEST,
  CORALMULTI_LIST_SUCCESS,
  CORALMULTI_LIST_FAIL,

  CORALMULTI_DELETE_SUCCESS,
  CORALMULTI_DELETE_REQUEST,
  CORALMULTI_DELETE_FAIL,
  
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

export const listMultiCoral = (keyword = '', pageNumber = '') => async (
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
    console.log('DB Coral',data)

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


export const deleteCoral = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CORALMULTI_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/multipolygon/${id}`, config)

    dispatch({
      type: CORALMULTI_DELETE_SUCCESS,
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
      type: CORALMULTI_DELETE_FAIL,
      payload: message,
    })
  }
}





//multipolygon add
export const createCoralMultipolygon = (name,features) => async (dispatch) => {
  try {
    dispatch({
      type: CORALMULTI_CREATE_REQUEST,
    })


    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/multipolygon`, {name,features},config)

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


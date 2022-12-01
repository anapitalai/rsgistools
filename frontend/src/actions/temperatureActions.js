import axios from 'axios'
import {
  TEMPERATURE_LIST_REQUEST,
  TEMPERATURE_LIST_SUCCESS,
  TEMPERATURE_LIST_FAIL,

  TEMPERATURE_CREATE_REQUEST,
  TEMPERATURE_CREATE_SUCCESS,
  TEMPERATURE_CREATE_FAIL,


} from '../constants/temperatureConstants'
import { logout } from './userActions'

export const listTemperatures = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: TEMPERATURE_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/temperature?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: TEMPERATURE_LIST_SUCCESS,
      payload: data,
    })

    console.log('temperatures',data)

  } catch (error) {
    dispatch({
      type: TEMPERATURE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const createTemperature = (location_name,latitude,longitude,time,date,temp_depth_3m,temp_depth_5_5m,temp_depth_9m) => async (dispatch) => {
  try {
    dispatch({
      type: TEMPERATURE_CREATE_REQUEST,
    })



    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/temperature`, {location_name,latitude,longitude,time,date,temp_depth_3m,temp_depth_5_5m,temp_depth_9m}) //,config removed

    dispatch({
      type: TEMPERATURE_CREATE_SUCCESS,
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
      type: TEMPERATURE_CREATE_FAIL,
      payload: message,
    })
  }
}


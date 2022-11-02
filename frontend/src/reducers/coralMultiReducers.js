import {
  CORALMULTI_LIST_REQUEST,
  CORALMULTI_LIST_SUCCESS,
  CORALMULTI_LIST_FAIL,

  CORALMULTI_DETAILS_REQUEST,
  CORALMULTI_DETAILS_SUCCESS,
  CORALMULTI_DETAILS_FAIL,
  // PRODUCT_DELETE_REQUEST,
  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_FAIL,
  CORALMULTI_CREATE_RESET,
  CORALMULTI_CREATE_FAIL,
  CORALMULTI_CREATE_SUCCESS,
  CORALMULTI_CREATE_REQUEST,
  // PRODUCT_UPDATE_REQUEST,
  // PRODUCT_UPDATE_SUCCESS,
  // PRODUCT_UPDATE_FAIL,
  // PRODUCT_UPDATE_RESET,
  // PRODUCT_CREATE_REVIEW_REQUEST,
  // PRODUCT_CREATE_REVIEW_SUCCESS,
  // PRODUCT_CREATE_REVIEW_FAIL,
  // PRODUCT_CREATE_REVIEW_RESET,
  // PRODUCT_TOP_REQUEST,
  // PRODUCT_TOP_SUCCESS,
  // PRODUCT_TOP_FAIL,
} from '../constants/coralMultiConstants'

export const coralMultiListReducer = (state = { corals: {} }, action) => {
  switch (action.type) {
    case CORALMULTI_LIST_REQUEST:
      return { loading: true, corals: {} }
    case CORALMULTI_LIST_SUCCESS:
      return {
        loading: false,
        corals: action.payload.corals,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case CORALMULTI_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}



export const coralMultiCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CORALMULTI_CREATE_REQUEST:
      return { loading: true }
    case CORALMULTI_CREATE_SUCCESS:
      return { loading: false, success: true, multicoral: action.payload }
    case CORALMULTI_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CORALMULTI_CREATE_RESET:
      return {}
    default:
      return state
  }
}


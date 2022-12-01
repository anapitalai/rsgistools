import {
  TEMPERATURE_LIST_REQUEST,
  TEMPERATURE_LIST_SUCCESS,
  TEMPERATURE_LIST_FAIL,

  TEMPERATURE_DELETE_REQUEST,
  TEMPERATURE_DELETE_SUCCESS,
  TEMPERATURE_DELETE_FAIL,

  TEMPERATURE_CREATE_RESET,
  TEMPERATURE_CREATE_FAIL,
  TEMPERATURE_CREATE_SUCCESS,
  TEMPERATURE_CREATE_REQUEST,

} from '../constants/temperatureConstants'

export const temperatureListReducer = (state = { temperatures: [] }, action) => {
  switch (action.type) {
    case TEMPERATURE_LIST_REQUEST:
      return { loading: true, temperatures: [] }
    case TEMPERATURE_LIST_SUCCESS:
      return {
        loading: false,
        temperatures: action.payload.temperatures,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case TEMPERATURE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const temperatureCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEMPERATURE_CREATE_REQUEST:
      return { loading: true }
    case TEMPERATURE_CREATE_SUCCESS:
      return { loading: false, success: true, temperatures: action.payload }
    case TEMPERATURE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case TEMPERATURE_CREATE_RESET:
      return {}
    default:
      return state
  }
}


export const temperatureDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEMPERATURE_DELETE_REQUEST:
      return { loading: true }
    case TEMPERATURE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TEMPERATURE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


// export const storeUpdateReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case PRODUCT_UPDATE_REQUEST:
//       return { loading: true }
//     case PRODUCT_UPDATE_SUCCESS:
//       return { loading: false, success: true, product: action.payload }
//     case PRODUCT_UPDATE_FAIL:
//       return { loading: false, error: action.payload }
//     case PRODUCT_UPDATE_RESET:
//       return { product: {} }
//     default:
//       return state
//   }
// }

// export const storeReviewCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REVIEW_REQUEST:
//       return { loading: true }
//     case PRODUCT_CREATE_REVIEW_SUCCESS:
//       return { loading: false, success: true }
//     case PRODUCT_CREATE_REVIEW_FAIL:
//       return { loading: false, error: action.payload }
//     case PRODUCT_CREATE_REVIEW_RESET:
//       return {}
//     default:
//       return state
//   }
// }

// export const storeTopRatedReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_TOP_REQUEST:
//       return { loading: true, products: [] }
//     case PRODUCT_TOP_SUCCESS:
//       return { loading: false, products: action.payload }
//     case PRODUCT_TOP_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

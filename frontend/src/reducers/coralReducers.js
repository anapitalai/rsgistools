import {
  CORAL_LIST_REQUEST,
  CORAL_LIST_SUCCESS,
  CORAL_LIST_FAIL,

  CORAL_DETAILS_REQUEST,
  CORAL_DETAILS_SUCCESS,
  CORAL_DETAILS_FAIL,
  // PRODUCT_DELETE_REQUEST,
  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_FAIL,
  CORAL_CREATE_RESET,
  CORAL_CREATE_FAIL,
  CORAL_CREATE_SUCCESS,
  CORAL_CREATE_REQUEST,
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
} from '../constants/coralConstants'

export const coralListReducer = (state = { corals: [] }, action) => {
  switch (action.type) {
    case CORAL_LIST_REQUEST:
      return { loadingCoral: true, corals: [] }
    case CORAL_LIST_SUCCESS:
      return {
        loadingCoral: false,
        corals: action.payload.corals,
        pagesCoral: action.payload.pagesCoral,
        pageCoral: action.payload.pageCoral,
      }
    case CORAL_LIST_FAIL:
      return { loadingCoral: false, errorCoral: action.payload }
    default:
      return state
  }
}



export const coralDetailsReducer = (
  state = { coral: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case CORAL_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CORAL_DETAILS_SUCCESS:
      return { loading: false, coral: action.payload }
    case CORAL_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// export const storeDeleteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_DELETE_REQUEST:
//       return { loading: true }
//     case PRODUCT_DELETE_SUCCESS:
//       return { loading: false, success: true }
//     case PRODUCT_DELETE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

export const coralCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CORAL_CREATE_REQUEST:
      return { loading: true }
    case CORAL_CREATE_SUCCESS:
      return { loading: false, success: true, coral: action.payload }
    case CORAL_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CORAL_CREATE_RESET:
      return {}
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

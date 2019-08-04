import {
  TICKETS_REQUEST,
  TICKETS_SUCCESS,
  TICKETS_FAIL,
  TICKETS_FILTER
} from "../constants/actionTypes";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
  ticketsList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFail: false
      };
    case TICKETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        ticketsList: action.ticketsList
      };
    case TICKETS_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true
      };
    case TICKETS_FILTER:
      return {
        ...state,
        ticketsList: action.filteredList
      };
    default:
      return state;
  }
};

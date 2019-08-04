import flat from "core-js/features/array/flat"; // flat() polyfill for edge

import {
  TICKETS_REQUEST,
  TICKETS_SUCCESS,
  TICKETS_FAIL,
  TICKETS_FILTER
} from "../constants/actionTypes";

export function ticketsRequest() {
  return dispatch => {
    dispatch({ type: TICKETS_REQUEST });
    fetch("./tickets.json")
      .then(response => response.json())
      .then(success => {
        sessionStorage.setItem(
          "defaultTicketsList",
          JSON.stringify(success.tickets)
        );
        dispatch({ type: TICKETS_SUCCESS, ticketsList: success });
      })
      .catch(e => {
        dispatch({ type: TICKETS_FAIL });
        throw e;
      });
  };
}

export function currencyChange(base, symbol, list) {
  return dispatch => {
    if (symbol === base) {
      return false;
    }
    if (symbol === "RUB") {
      dispatch({
        type: TICKETS_FILTER,
        filteredList: JSON.parse(sessionStorage.getItem("defaultTicketsList"))
      });
    } else {
      fetch(
        `https://api.exchangeratesapi.io/latest?symbols=${symbol}&base=${base}`
      )
        .then(response => response.json())
        .then(success => {
          const tempArr = list.map(elem => ({
            ...elem,
            price: Math.round(elem.price * success.rates[`${symbol}`])
          }));
          dispatch({ type: TICKETS_FILTER, filteredList: tempArr });
        });
    }
  };
}

export function ticketsFilter(stopsArr) {
  return dispatch => {
    const defaultTicketList = JSON.parse(
      sessionStorage.getItem("defaultTicketsList")
    );
    if (stopsArr[0]) {
      dispatch({
        type: TICKETS_FILTER,
        filteredList: defaultTicketList
      });
    } else {
      const tempArr = flat(
        stopsArr.map((elem, index) => {
          if (elem) {
            return defaultTicketList.filter(
              ticket => ticket.stops === index - 1
            );
          }
          return null;
        })
      ).filter(Boolean);
      if (tempArr.length === 0) {
        dispatch({ type: TICKETS_FILTER, filteredList: defaultTicketList });
      } else {
        dispatch({ type: TICKETS_FILTER, filteredList: tempArr });
      }
    }
  };
}

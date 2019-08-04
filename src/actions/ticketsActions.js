import { TICKETS_FILTER } from "../constants/actionTypes";

export const ticketsFilter = filteredList => ({
  type: TICKETS_FILTER,
  filteredList
});

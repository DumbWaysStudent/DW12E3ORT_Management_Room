import {
  GET_CUSTOMER_PENDING,
  GET_CUSTOMER_FULLFILLED,
  GET_CUSTOMER_REJECTED,
} from '../configurations/constant';

export const axiosFetchData = set => {
  return {
    type: GET_CUSTOMER_PENDING,
    payload: set,
  };
};

export const axiosFetchDataFullfilled = data => {
  return {
    type: GET_CUSTOMER_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const axiosFetchDataRejected = error => {
  return {
    type: GET_CUSTOMER_REJECTED,
    payload: error,
    isLoading: false,
  };
};

import {
  GET_USER_PENDING,
  GET_USER_FULLFILLED,
  GET_USER_REJECTED,
} from '../configurations/constant';

export const axiosFetchData = set => {
  return {
    type: GET_USER_PENDING,
    payload: set,
  };
};

export const axiosFetchDataFullfilled = data => {
  return {
    type: GET_USER_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const axiosFetchDataRejected = error => {
  return {
    type: GET_USER_REJECTED,
    payload: error,
    isLoading: false,
  };
};

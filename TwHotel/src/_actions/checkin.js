import {
  GET_CHECKIN_PENDING,
  GET_CHECKIN_FULLFILLED,
  GET_CHECKIN_REJECTED,
} from '../configurations/constant';

export const axiosFetchData = set => {
  return {
    type: GET_CHECKIN_PENDING,
    payload: set,
  };
};

export const axiosFetchDataFullfilled = data => {
  return {
    type: GET_CHECKIN_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const axiosFetchDataRejected = error => {
  return {
    type: GET_CHECKIN_REJECTED,
    payload: error,
    isLoading: false,
  };
};

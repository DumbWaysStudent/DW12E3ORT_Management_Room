import {
  GET_ROOM_PENDING,
  GET_ROOM_FULLFILLED,
  GET_ROOM_REJECTED,
} from '../configurations/constant';

export const axiosFetchData = set => {
  return {
    type: GET_ROOM_PENDING,
    payload: set,
  };
};

export const axiosFetchDataFullfilled = data => {
  return {
    type: GET_ROOM_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const axiosFetchDataRejected = error => {
  return {
    type: GET_ROOM_REJECTED,
    payload: error,
    isLoading: false,
  };
};

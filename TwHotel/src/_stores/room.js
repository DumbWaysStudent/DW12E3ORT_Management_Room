import {
  axiosFetchData,
  axiosFetchDataFullfilled,
  axiosFetchDataRejected,
} from '../_actions/room';

import {URL} from '../configurations/api';

export const fetchAllRoom = () => {
  return dispatch => {
    dispatch(axiosFetchData(false));

    URL.get(`rooms`)
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

export const addNewRoom = data => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.post('room', {
      name: data,
    })
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

export const fetchEditRoom = (id, data) => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.put(`room/${id}`, {
      name: data,
    })
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

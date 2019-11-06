import {
  axiosFetchData,
  axiosFetchDataFullfilled,
  axiosFetchDataRejected,
} from '../_actions/checkin';

import {URL} from '../configurations/api';

export const fetchDataCheckin = () => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.get(`checkins`)
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

export const fetchAddCheckin = (room_id, customer_id, duration) => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.post(`checkin`, {
      room_id,
      customer_id,
      duration: parseInt(duration),
    })
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

export const fetchCheckout = id_order => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.put(`order/${id_order}`)
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

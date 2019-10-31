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

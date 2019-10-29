import {
  axiosFetchData,
  axiosFetchDataFullfilled,
  axiosFetchDataRejected,
} from '../_actions/room';

import {URL} from '../configurations/api';

const rooms = () => {
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
export default rooms;

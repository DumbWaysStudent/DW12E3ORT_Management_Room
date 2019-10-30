import {
  axiosFetchData,
  axiosFetchDataFullfilled,
  axiosFetchDataRejected,
} from '../_actions/setting';

import {URL} from '../configurations/api';

export const fetchDataUser = id => {
  console.log(id);
  return dispatch => {
    dispatch(axiosFetchData(false));

    URL.get(`user/${id}`)
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

export default fetchDataUser;

import {
  axiosFetchData,
  axiosFetchDataFullfilled,
  axiosFetchDataRejected,
} from '../_actions/customer';

import {URL} from '../configurations/api';

const customers = () => {
  return dispatch => {
    dispatch(axiosFetchData(false));

    URL.get(`customers`)
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};
export default customers;

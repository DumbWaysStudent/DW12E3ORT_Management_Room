import {
  axiosFetchData,
  axiosFetchDataFullfilled,
  axiosFetchDataRejected,
} from '../_actions/customer';

import {URL} from '../configurations/api';

export const getAllCustomer = () => {
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

export const addNewCustomer = (name, identityNumber, phoneNumber) => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.post(`customer`, {
      name: name,
      identity_number: identityNumber,
      phone_number: phoneNumber,
      image:
        'https://cdn3.f-cdn.com/contestentries/1269942/15600440/5a991c82be987_thumb900.jpg',
    })
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

export const EditCustomer = (id, name, identityNumber, phoneNumber, Img) => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.put(`customer/${id}`, {
      name: name,
      identity_number: identityNumber,
      phone_number: phoneNumber,
      image: Img,
    })
      .then(res => {
        dispatch(axiosFetchDataFullfilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

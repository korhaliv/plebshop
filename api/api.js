import axios from 'axios';

export const getInvoice = (invoiceId) => {
  return axios({
    method: 'get',
    url: `/api/invoices/${invoiceId}`,
  }).then(({ data }) => data);
};

export const getCheckUser = (username) => {
  return axios
    .get('/api/user/getCheckUser', {
      params: { username },
    })
    .then(({ data }) => data);
};

import axios from 'axios';

const API_URL = process.env.STRIKE_API_URL;
const API_KEY = process.env.STRIKE_API_KEY;

const HEADER = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

export function fetchQuote(invoiceId) {
  const config = {
    method: 'post',
    url: `${API_URL}invoices/${invoiceId}/quote`,
    headers: HEADER,
  };

  return axios(config);
}

export function fetchInvoice(amount, currency, description = '') {
  let data = JSON.stringify({
    description,
    amount: { amount, currency },
  });

  const config = {
    method: 'post',
    url: `${API_URL}invoices`,
    headers: HEADER,
    data,
  };

  return axios(config);
}

export function createInvoice({
  username,
  amount,
  currency,
  description = '',
}) {
  let data = JSON.stringify({
    description,
    amount: { amount, currency },
  });

  const config = {
    method: 'post',
    url: `${API_URL}invoices/handle/${username}`,
    headers: HEADER,
    data,
  };

  return axios(config);
}

export function getInvoiceStatus(invoice) {
  const config = {
    method: 'get',
    url: `${API_URL}invoices/${invoice}`,
    headers: HEADER,
  };

  return axios(config);
}

export const fetchUserByHandle = (handle) => {
  const config = {
    method: 'get',
    url: `${API_URL}accounts/handle/${handle}/profile`,
    headers: HEADER,
  };

  return axios(config);
};

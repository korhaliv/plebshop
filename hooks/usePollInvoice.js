import { getInvoice } from 'api/api';
import useSWR from 'swr';

export const usePollInvoice = (invoiceId) => {
  const { data, error } = useSWR(invoiceId, getInvoice, {
    refreshInterval: 1000,
  });

  return { data, error };
};

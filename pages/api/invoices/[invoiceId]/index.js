import { getInvoiceStatus } from 'api/strikeApi';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { invoiceId } = req.query;
    try {
      const {
        data: { state },
      } = await getInvoiceStatus(invoiceId);
      res.status(200).json(state);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: 'Invalid invoice' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

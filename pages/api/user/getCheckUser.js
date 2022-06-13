import { fetchUserByHandle } from 'api/strikeApi';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { username } = req.query;
    try {
      const data = await fetchUserByHandle(username);
      if (data?.data?.canReceive) {
        res.status(200).json({});
      } else {
        res.status(400).json({ error: `User can't receive payments` });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: 'User not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

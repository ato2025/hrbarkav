import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const cookieValue = req.headers.cookie?.split(';').find(cookie => cookie.trim().startsWith('accessToken='));

  if (cookieValue) {
    const value = cookieValue.split('=')[1];
    res.status(200).json({ cookieValue: value });
  } else {
    res.status(404).json({ message: 'Cookie not found' });
  }
}

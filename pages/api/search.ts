import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keywords } = req.query;

  res.status(200).json({ msg: keywords });
}

export default handler;

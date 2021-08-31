import { NextApiRequest, NextApiResponse } from 'next';
import { getPostsBySearchKeywords } from '#utils/posts';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const keywords = req.query.keywords as string;

  const posts = await getPostsBySearchKeywords(keywords);

  res.status(200).json({ data: posts });
}

export default handler;

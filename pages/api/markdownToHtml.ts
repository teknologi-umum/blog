import { NextApiRequest, NextApiResponse } from 'next';
import { markdownToHtml } from '../../utils/markdownToHtml';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const html = await markdownToHtml(req.body);

  return res.send(html);
}

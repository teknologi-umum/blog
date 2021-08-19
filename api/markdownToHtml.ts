import { VercelRequest, VercelResponse } from '@vercel/node';
import { markdownToHtml } from '../utils/markdownToHtml';

export default async function handle(req: VercelRequest, res: VercelResponse) {
  const html = await markdownToHtml(req.body);

  return res.send(html);
}

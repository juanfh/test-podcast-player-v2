import Parser from 'rss-parser'
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const parser = new Parser()
  const feed = await parser.parseURL(req.body.url)

  return res.status(200).json(feed)

}

export default handler
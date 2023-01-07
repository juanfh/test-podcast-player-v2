import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const response = await fetch(`${process.env.API_URL}/${req.body.url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  return res.status(200).json(data)
}

export default handler
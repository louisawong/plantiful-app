// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../util/dbConnect'

dbConnect();

export default async (req, res) => {
    res.status(200).json({ name: 'John Doe' })
  }
  
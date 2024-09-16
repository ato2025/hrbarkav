// pages/api/[...path].js

import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // After successful authentication

  if (req.method === "OPTIONS") {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const body = req.body;
    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", body.token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: "/",
        })
      )
      .status(200)
      .json(body);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    externalResolver: true,
  },
};

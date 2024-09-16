// pages/api/login.js

import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req:NextApiRequest, res:NextApiResponse) {
  // After successful authentication
  const accessToken = '';
  const refreshToken = '';
  
 

  res.setHeader("Set-Cookie", [
    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${accessToken}`,
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${refreshToken}`,
  ]);

  res.status(200).json({ message: "soran" });
}

import {  axiosServer } from "@/axios/Axios";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/Utils/generateToken";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const { hashedInfo } = req.body;
      const decryptedData = decodeToken(hashedInfo);
      const parcedData = JSON.parse(decryptedData);

      axiosServer
        .post("/Account/Authenticate", parcedData)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;

            return res
            .setHeader(
              "Set-Cookie",
              cookie.serialize("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                path: "/",
              })
            )
              .status(200)
              .json({ token });
            //  return res.setHeader("Set-Cookie", `accessToken=${token}; HttpOnly; Path=/; Max-Age=3600`).status(200).json({ token });
          }
        })
        .catch((err) => {
          res.status(err.status).json(err.message);
        });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

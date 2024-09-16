import { NextApiRequest, NextApiResponse } from "next";
import {  axiosServer } from "@/axios/Axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST'); 
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type'); 

  
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); 
  }

 
  const cook = `token=${req.cookies.token}`
  axiosServer.defaults.headers.common['Cookie'] = cook;

  axiosServer
    .put("/JobPostistion/Update", req.body)
    .then((response) => {
      if (response.status === 200) {
        return res.status(200).json({ message: "اپدیت شد" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
}

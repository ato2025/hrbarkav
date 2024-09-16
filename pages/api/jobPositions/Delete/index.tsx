import { NextApiRequest, NextApiResponse } from "next";
import {  axiosServer } from "@/axios/Axios";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST'); 
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');  

  
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); 
  }

  
  const { id } = req.body;
  const cook = `token=${req.cookies.token}`
  axiosServer.defaults.headers.common['Cookie'] = cook;

  axiosServer
    .post(`/JobPostistion/Delete/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return res.status(200).json({ message: "حذف شد" });
      }
    })
    .catch((err) => {
      return res.status(499).json({ message: err });
    });
}

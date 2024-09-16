// pages/api/[...path].js

import { NextApiRequest, NextApiResponse } from "next";
import { axiosServer } from "@/axios/Axios";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
   // const { id } = req.body;
   // const cook = `token=${req.cookies.token}`
   // axiosExternal.defaults.headers.common['Cookie'] = cook
   
   axiosServer
   .get("/JobPostistion/GetAll")
   .then((response) => {
     if (response.status == 200) {
       return res.status(200).json({ data: response.data });
     }
   })
   .catch((err) => {
     return res.status(400).json(err.message);
   });
}



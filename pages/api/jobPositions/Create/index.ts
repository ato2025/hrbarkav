
import { NextApiRequest, NextApiResponse } from "next";
import {  axiosServer } from "@/axios/Axios";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   const { type, title,id } = req.body;
   const cook = `token=${req.cookies.token}`
   console.log(req.cookies.token)
   const data = { title }
   axiosServer.defaults.headers.common['Cookie'] = cook
   axiosServer
   .post("/JobPostistion/Create", data)
   .then((response) => {
     if (response.status == 200) {
       return res.status(200).json("موقعیت با موفقیت ایجاد شد");
     }
   })
   .catch((err) => {
     console.log(err);
     return res.status(400).json({ message: err });
     throw err;
   });
}



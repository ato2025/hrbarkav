import {  axiosServer } from "@/axios/Axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const cookieValue = req.headers.cookie
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("token="))?.slice(6)
      
    if (cookieValue) {
      axiosServer
        .post("/Employee/Create", req.body, {
          headers: {
            Authorization: `Bearer ${cookieValue}`, 
            "Content-Type": "application/json", 
          },
        })
        .then((respone) => {
          if (respone.status == 200) {
            res.status(200).json('لینک کاربر با موفقیت ایجاد شد');
            return;
          }
          
        })
        .catch(err=>{
          res.status(401).json({ message:err });
        })
    }

    // res.status(404).json({ message: 'Cookie not found' });
  }
}

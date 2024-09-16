// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { axiosServer } from "@/axios/Axios";

import type { NextApiRequest, NextApiResponse } from "next";



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

axiosServer.get('/Employee/GetAll')
.then((response)=>{
   if(response.status == 200){
      res.status(200).json(response.data);
   }
}).catch((Err)=>{
   res.status(401).json({message:Err.message});
})

}

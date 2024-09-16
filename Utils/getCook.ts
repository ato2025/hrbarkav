import axios from "axios";

export async function getCook() {
const result = await axios.get("/api/getCookie")
  .then(res=>{
    if(res.status == 200){
      return res.data
    }
  })
  .catch(err=>{
    throw err
  })
  return result
 }
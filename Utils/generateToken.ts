import CryptoJS from 'crypto-js';

const secretKey: string | undefined = process.env.NEXT_PUBLIC_KEY; // Retrieve SECRET_KEY environment variable
 

export const  generateToken  = async (payLoad:any) => {
  const encryptedData =  CryptoJS.AES.encrypt(JSON.stringify(payLoad), secretKey as string).toString();
 

  


  return encryptedData
};

export const decodeToken = (data:string)=> {
  const decryptedData = CryptoJS.AES.decrypt(data,  secretKey as string).toString(CryptoJS.enc.Utf8);
 
  return decryptedData
};

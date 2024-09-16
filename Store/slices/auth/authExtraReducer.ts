import {  axiosLocal } from "@/axios/Axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type APIResponse = {
  token: string;
};
type PostData = Promise<string>

export const authChecking = createAsyncThunk<APIResponse, PostData>(
  "employers/authChecking",
  async (data, thunkAPI) => {
    const hash = await data.then(res=>res)
   
    try {
      
      const response = await axiosLocal.post<APIResponse>("/api/authUser", {hashedInfo:hash});

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
     
      throw error;
    }
  }
);

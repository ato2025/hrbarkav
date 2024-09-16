import {  axiosServer } from "@/axios/Axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type ResponseItem = {
   id:number,
   title:string
}

type APIResponse =ResponseItem[]
// type APIResponse = {
//   data:ResponseItem[]
// }


export const getAllJobPositions = createAsyncThunk<APIResponse>(
  'jobPositions/getAllJobPositions',
  async () => {
    try {
    
      const response = await axiosServer.get<APIResponse>("/JobPostistion/GetAll")
     const data = await response.data

     return data
      
      
      
    
    } catch (error) {
      console.error("Error fetching employers:", error);
      throw error;
    }
  }
);

type sentData = {
  title: string
}

export const PostAddEmployerData = createAsyncThunk<APIResponse, sentData>(
  'employers/postEmployerData',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post<APIResponse>("/JobPostistion/Create", data)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            }
          });

      if (!response) {
        throw new Error('Failed to fetch data');
      }

      return response; 

    } catch (error) {
      console.error("Error posting employer data:", error);
      throw error;
    }
  }
);
import { axiosServer } from "@/axios/Axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// Define the type for the data parameter
interface GetData {
  // Define the structure of the data parameter here
}

// Define the return type of the API call
interface APIResponse {
  // Define the structure of the API response here
}
type PostData ={}

// Define your async thunk
export const getAllEmployers = createAsyncThunk<APIResponse, GetData>(
  'employers/getAllEmployers',
  async (data, thunkAPI) => {
    try {
      // Example Axios request
      const response = await axios.get<APIResponse>("https://example.com/api/employers", {
        // If you need to send any data with your request, you can include it here:
        // params: data,
        // You can also include additional headers if needed:
        // headers: {
        //   "Authorization": "Bearer your_access_token"
        // }
      });
      
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle any errors
      console.error("Error fetching employers:", error);
      // You can throw an error to indicate that the operation failed
      throw error;
    }
  }
);

export const postEmployerFileData = createAsyncThunk<any, any>(
  'employers/postEmployerFileData',
  async (data) => {
   return await axiosServer
        .post("/Employee/RequestJobFile", data)
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "با موفقیت ثبت شد",
              icon: "success",
            });
            return res.data
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
);
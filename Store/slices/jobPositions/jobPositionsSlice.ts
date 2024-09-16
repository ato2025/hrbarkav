import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllJobPositions, PostAddEmployerData } from "./jobPositionsExtraReducers";

type ResponseItem = {
  id: number;
  title: string;
};
// type ResponseItem = {
//   id: number;
//   title: string;
// };

export type JobPositionsState = { data: ResponseItem[] };

const initialState: JobPositionsState = {
  data: [],
};

const jobPositionsSlice = createSlice({
  name: "jobPositions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobPositions.pending, (state) => {})
      .addCase(getAllJobPositions.fulfilled, (state, { payload }) => {
       
        state.data = payload;
      })
      .addCase(getAllJobPositions.rejected, (state) => {})
      
      
      .addCase(PostAddEmployerData.pending, (state) => {})
      .addCase(PostAddEmployerData.fulfilled, (state, { payload }) => {
       console.log(payload)
        // state.data = payload;
      })
      .addCase(PostAddEmployerData.rejected, (state) => {})

  },
});

export default jobPositionsSlice.reducer;

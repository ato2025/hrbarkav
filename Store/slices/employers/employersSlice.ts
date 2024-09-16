import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postEmployerFileData } from './employersExtraReducers';


export interface EmployersState {
  isFileSent : boolean,
  isInfosSent:boolean
}

const initialState: EmployersState = {
  isFileSent : false,
  isInfosSent:false
};

const employersSlice = createSlice({
  name: 'employers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(postEmployerFileData.pending,(state)=>{
     state.isFileSent = true
    })
    builder
    .addCase(postEmployerFileData.fulfilled,(state)=>{
     state.isFileSent = false
    })
    builder
    .addCase(postEmployerFileData.rejected,(state)=>{
     state.isFileSent = false
    })
  },
});


export default employersSlice.reducer;

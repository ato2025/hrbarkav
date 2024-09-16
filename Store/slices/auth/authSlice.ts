import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authChecking } from "./authExtraReducer";
import Swal from "sweetalert2";

export interface AuthsState {
  isDataLoading: boolean;
  token: {
    refreshToken:string,
    token:string
  }
}

const initialState: AuthsState = {
  isDataLoading: false,
  token : {
    refreshToken:'',
    token:''
  }
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authChecking.pending, (state) => {
        state.isDataLoading = true;
        
      })
      .addCase(authChecking.fulfilled, (state,{payload}) => {
        localStorage.setItem('cookSoran',JSON.stringify(payload.token))
        state.isDataLoading = false;
        state.token.token = payload.token
      })
      .addCase(authChecking.rejected, (state) => {
        Swal.fire({
          title:'کاربر یافت نشد',
          icon:'info',
          confirmButtonText:'تلاش دوباره'
        })
        state.isDataLoading = false;
        
      });
  },
});

export const { setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;

import { combineReducers, Reducer } from "@reduxjs/toolkit";
import employersSlice, { EmployersState } from "./slices/employers/employersSlice";
import { AuthsState } from "./slices/auth/authSlice";
import { authReducer } from "./slices/auth/authSlice";
import jobPositionsSlice, { JobPositionsState } from "./slices/jobPositions/jobPositionsSlice";

export type RootState = {
  employers: EmployersState;
  auth: AuthsState;
  jobPositions: JobPositionsState;
}

const reducers: Reducer<RootState> = combineReducers({
  employers: employersSlice,
  auth: authReducer,
  jobPositions: jobPositionsSlice
});

export default reducers;

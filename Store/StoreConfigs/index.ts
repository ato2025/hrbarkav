import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "../index";
import { RootState } from "../reducers";

export type AppDispatch = typeof store.dispatch
export type AppSelector = typeof store.getState


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
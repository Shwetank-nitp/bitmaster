import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

export const storeDispatch = () => useDispatch<AppDispatch>();
export const storeSelector: TypedUseSelectorHook<RootState> = useSelector;

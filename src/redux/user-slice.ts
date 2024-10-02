import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

interface User {
  _id: number;
  username: string;
  email: string;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;
export const { setUser, clearUser } = userSlice.actions;

import { createSlice, PayloadAction as type } from "@reduxjs/toolkit";

export type Language = {
  key: string;
  value: string;
};

interface LanguageState {
  all_languages: Language[];
}

const initialState: LanguageState = {
  all_languages: [],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguages: (state, action: type<Language[]>) => {
      state.all_languages = action.payload;
    },
    clearLanguages: (state) => {
      state.all_languages = [];
    },
  },
});

const languageSliceReducer = languageSlice.reducer;

export default languageSliceReducer;
export const { setLanguages } = languageSlice.actions;

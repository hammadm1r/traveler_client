import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    accountInformation: {},
    accountSetup: {},
  },
  reducers: {
    updateAccountInformation: (state, action) => {
      state.accountInformation = action.payload;
    },
    updateAccountSetup: (state, action) => {
      state.accountSetup = action.payload;
    },
  },
});

export const { updateAccountInformation, updateAccountSetup } = formSlice.actions;
export default formSlice.reducer;

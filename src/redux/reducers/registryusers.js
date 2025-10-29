import { createSlice } from "@reduxjs/toolkit";

export const registryusersSlice = createSlice({
  name: "registryusers",
  initialState: {
    email: "",
  },
  reducers: {
    updateRegistryUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { updateRegistryUserEmail } = registryusersSlice.actions;
export const updateRegistryReducer = registryusersSlice.reducer;
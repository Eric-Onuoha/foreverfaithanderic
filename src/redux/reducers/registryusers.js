import { createSlice } from "@reduxjs/toolkit";

export const registryusersSlice = createSlice({
  name: "registryusers",
  initialState: {
    registryusers: [],     // list of all users
    currentUser: null      // currently active/selected user
  },
  reducers: {
      updateRegistryUsers: (state, action) => {
      state.registryusers = action.payload;
    },
      setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { updateRegistryUsers, setCurrentUser } = registryusersSlice.actions;
export const updateRegistryReducer = registryusersSlice.reducer;

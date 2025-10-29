import { createSlice } from "@reduxjs/toolkit";

export const registryusersSlice = createSlice({
    name: "registryusers",
    initialState: {},
    reducers: {
        updateRegistryUsers:(state, action) => {
            state.registryusers = action.payload;
        }
    }
});

export const {updateRegistryUsers} = registryusersSlice.actions;
export const updateRegistryReducer = registryusersSlice.reducer;
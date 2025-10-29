import { createSlice } from "@reduxjs/toolkit";

export const registryitemsSlice = createSlice({
  name: "registryitems",
  initialState: { registryitems: {} },
  reducers: {
    updateRegistryItems: (state, action) => {
      state.registryitems = action.payload;
    },
    reduceItemQuantity: (state, action) => {
      const { itemId } = action.payload;
      if (state.registryitems[itemId]) {
        const currentQty = Number(state.registryitems[itemId].quantity) || 0;
        state.registryitems[itemId].quantity = Math.max(0, currentQty - 1);
      }
    },
  },
});

export const { updateRegistryItems, reduceItemQuantity } = registryitemsSlice.actions;
export const updateRegistryItemsReducer = registryitemsSlice.reducer;
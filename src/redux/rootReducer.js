import { combineReducers } from "@reduxjs/toolkit";

import { updateRegistryReducer } from "./reducers/registryusers";
import { updateRegistryItemsReducer } from "./reducers/registryItems";

export const rootReducer = combineReducers({
    registryusers: updateRegistryReducer,
    registryitems: updateRegistryItemsReducer
});
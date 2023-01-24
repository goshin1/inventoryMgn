import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./inventorySlice";
const store = configureStore({
    reducer : {
        inventory : inventorySlice.reducer
    }
});
export default store;
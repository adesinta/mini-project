import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./src/features/CartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;

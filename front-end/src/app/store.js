import { configureStore } from "@reduxjs/toolkit";
import rolesReducer from "../features/roles/rolesSlice";
import categoriesReducer from "../features/categories/categorieSlice";
import authReducer from "../features/Auths/authSlice";
import userReducer from "../features/users/userSlice";
import storeReducer from "../features/stores/storeSlice";
import productReducer from "../features/products/productSlice";
import ordreReducer from "../features/orders/ordreSlice";

const store = configureStore({
  reducer: {
    roles: rolesReducer,
    categories: categoriesReducer,
    auth: authReducer,
    users: userReducer,
    stores: storeReducer,
    products: productReducer,
    ordres: ordreReducer,
  },
});

export default store;

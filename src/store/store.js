import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import ProductReducer from '../store/slice/ProductSlice';
import CartReducer from '../store/slice/CartSlice';
import {productsApi} from '../services/productsApi';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    cart: CartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

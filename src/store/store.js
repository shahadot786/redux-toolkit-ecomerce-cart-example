import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from '../store/slice/ProductSlice';
import CartReducer from '../store/slice/CartSlice';

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    cart: CartReducer,
  },
});

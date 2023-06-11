const {createSlice} = require('@reduxjs/toolkit');

const ProductSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProducts(state, action) {
      state.push(action.payload);
    },
  },
});

export const {addProducts} = ProductSlice.actions;

export default ProductSlice.reducer;

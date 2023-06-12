const {createSlice} = require('@reduxjs/toolkit');

const ProductSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProducts(state, action) {
      state.push(action.payload);
    },
    increaseQty(state, action) {
      let myIndex = -1;
      state.map((item, index) => {
        if (item.id == action.payload) {
          myIndex = index;
        }
      });
      if (myIndex == -1) {
      } else {
        state[myIndex].qty = state[myIndex].qty + 1;
      }
    },
  },
});

export const {addProducts, increaseQty} = ProductSlice.actions;

export default ProductSlice.reducer;

const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProductToCart(state, action) {
      let myIndex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myIndex = index;
        }
      });
      if (myIndex == -1) {
        state.push({
          brand: action.payload.brand,
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.name,
          price: action.payload.price,
          qty: action.payload.qty + 1,
        });
      } else {
        state[myIndex].qty = state[myIndex].qty + 1;
      }
    },
    removeProductToCart(state, action) {
      let myIndex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myIndex = index;
        }
      });
      if (myIndex == -1) {
      } else {
        state[myIndex].qty = state[myIndex].qty - 1;
      }
    },
    deleteCartItem(state, action) {
      return (state = state.filter(item => item.id !== action.payload));
    },
  },
});

export const {addProductToCart, removeProductToCart, deleteCartItem} =
  CartSlice.actions;

export default CartSlice.reducer;

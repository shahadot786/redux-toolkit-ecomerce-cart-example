import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://dummyjson.com/';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    //get all products
    products: builder.query({
      query: () => 'products',
    }),
    //get single product
    product: builder.query({
      query: id => `products/${id}`,
    }),
    //search product
    search: builder.query({
      query: query => `products/search?q=${query}`,
    }),
    //add new product
    addProduct: builder.mutation({
      query: product => ({
        url: 'products/add',
        method: 'POST',
        body: product,
      }),
    }),
    //update product
    updateProduct: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    //delete product
    deleteProduct: builder.mutation({
      query: id => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  useSearchQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

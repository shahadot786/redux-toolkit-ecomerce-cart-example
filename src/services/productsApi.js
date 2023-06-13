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
  }),
});

export const {useProductsQuery, useProductQuery} = productsApi;

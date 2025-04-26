import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://real-time-news-data.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', process.env.REACT_APP_RAPIDAPI_KEY);
      headers.set('x-rapidapi-host', 'real-time-news-data.p.rapidapi.com');
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory = 'Cryptocurrency', count = 10 }) =>
        `/search?` +
        `query=${encodeURIComponent(newsCategory)}` +
        `&limit=${count}` +
        `&time_published=anytime` +
        `&country=US` +
        `&lang=en`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

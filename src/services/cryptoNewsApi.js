// src/services/cryptoNewsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',

  /* ──────────────────────────────────────────────────────────
     базовый fetch, к которому RTK Query будет добавлять
     your-path + params и RapidAPI-заголовки
  ────────────────────────────────────────────────────────── */
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://real-time-news-data.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', process.env.REACT_APP_RAPIDAPI_KEY);
      headers.set('x-rapidapi-host', 'real-time-news-data.p.rapidapi.com');
      return headers;
    },
  }),

  /* ───────────────────── эндпоинты ───────────────────── */
  endpoints: (builder) => ({
    /**  GET /search?query=…&limit=…&time_published=anytime&country=US&lang=en */
    getCryptoNews: builder.query({
      // newsCategory и count приходят из компонента
      // { newsCategory: 'Elon Musk', count: 10 }
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

/* ───────── экспорт готового React-хука ───────── */
export const { useGetCryptoNewsQuery } = cryptoNewsApi;

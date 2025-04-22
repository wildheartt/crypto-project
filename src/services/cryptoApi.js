import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
const cryptoApiHeaders = {
  'X-RapidAPI-Key': '9fc0d80454mshc72e48cf036fca3p1d138cjsn3729198bcc3d',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
};
const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1/cryptodaily';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  }),
});
// const options = {
//   method: 'GET',
//   hostname: 'cryptocurrency-news2.p.rapidapi.com',
//   port: null,
//   path: '/v1/cryptodaily',
//   headers: {
//     'x-rapidapi-key': '9fc0d80454mshc72e48cf036fca3p1d138cjsn3729198bcc3d',
//     'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com',
//   },
// };

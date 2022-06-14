import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

/* #region  Error Tester */

// Leaving this here so I can quickly error check in the future
// api.interceptors.request.use(() => {
//   throw Error('Test error message');
// });

/* #endregion */
export default api;

import axios from 'axios';

const tailwindShadesAPI = axios.create({
  baseURL: 'https://tailwind.simeongriggs.dev/api/',
});

export default tailwindShadesAPI;

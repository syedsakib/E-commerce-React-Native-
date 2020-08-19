import client from './client';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import authStorage from '../auth/storage';

const endpoint = '/products';

const instance = axios.create({
  baseURL: 'http://e7f789b9e77a.ngrok.io',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const getListings = () => instance.get(endpoint);

const addListings = (listing) => {
  const data = new FormData();
  data.append('title', listing.title);
  data.append('price', listing.price);
  data.append('categoryId', listing.category.value);
  if (listing.location) {
    data.append('locations', JSON.stringify(listing.location));
  }

  return instance.post(endpoint, data);
};

export default {
  getListings,
  addListings,
};

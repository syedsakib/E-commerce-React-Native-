import { useState } from 'react';

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    try {
      setLoading(true);
      //const response = await listingsApi.getListings();
      const response = await apiFunc();
      setLoading(false);

      setError(false);
      setData(response.data);
    } catch (err) {
      setError(true);
    }
  };
  return { data, error, loading, request };
};

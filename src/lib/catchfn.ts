import axios from 'axios';
import { baseUrl } from '@/public/baseUrl';
export const apiClient = async (
  methodType: string,
  url: string,
  cache: boolean = false
) => {
  const header = {
    'Cache-Control': `no-cache`,
  };
  let data;
  if (methodType === 'get') {
    data = await axios.get(url, {
      headers: cache ? header : {},
    });
  } else if (methodType === 'post') {
    data = await axios.post(url, {
      headers: cache ? header : {},
    });
  } else if (methodType === 'put') {
    data = await axios.put(url, {
      headers: cache ? header : {},
    });
  } else {
    data = await axios.delete(url, {
      headers: cache ? header : {},
    });
  }
  return data;
};

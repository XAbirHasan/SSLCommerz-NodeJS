import fetch, { BodyInit, RequestInit } from 'node-fetch';

interface HttpCallOptions {
  url: string;
  // *GET, POST, PUT, DELETE, etc.
  method?: string;
  data?: BodyInit | null;
}

export const httpCall = async ({ url, method = 'POST', data = {} }: HttpCallOptions): Promise<any> => {
  const requestOptions: RequestInit = {
    method,
    // mode: 'cors', // no-cors, cors, *same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow',
    referrer: 'no-referrer',
    ...['POST', 'PUT', 'PATCH', 'UPDATE'].includes(method) && { body: data }
  };
  try {
    const response = await fetch(url, requestOptions);
    return response.json();
  } catch (err) {
    return err;
  }
};

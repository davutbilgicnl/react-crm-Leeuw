import { SERVER } from '../services/ApiUrls';

export const Header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...(localStorage.getItem('Token') && {
    Authorization: localStorage.getItem('Token'),
  }),
  ...(localStorage.getItem('org') && {
    org: localStorage.getItem('org'),
  }),
};

export const Header1 = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...(localStorage.getItem('Token') && {
    Authorization: localStorage.getItem('Token'),
  }),
};

export function fetchData(
  url: string,
  method: string,
  data: any = null,
  header: any
) {
  const finalUrl = url.startsWith('http') ? url : `${SERVER}${url}`;

  const options: RequestInit = {
    method,
    headers: header,
  };

  // Sadece GET dışındaki metodlar için body ekle
  if (data && method.toUpperCase() !== 'GET') {
    options.body = typeof data === 'string' ? data : JSON.stringify(data);
  }

  return fetch(finalUrl, options).then(async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.indexOf('application/json') !== -1;

    if (!response.ok) {
      const errorText = isJson ? await response.json() : await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return isJson ? response.json() : response;
  });
}

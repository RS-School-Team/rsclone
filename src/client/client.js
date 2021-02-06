import { path } from '../assets/path';

export default async function apiClient(pathParams, method, token, body) {
  var myHeaders = new Headers();
  if (token) {
    myHeaders.append('Authorization', `Bearer ${token}`);
  }

  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: method,
    body: body || null,
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(`${path}${pathParams}`, requestOptions);
}

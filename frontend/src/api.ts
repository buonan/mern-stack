import fetch from "isomorphic-fetch";
const dev = process.env.NODE_ENV !== 'production';
const SERVER_SIDE_API_HOST = process.env.SERVER_SIDE_API_HOST || 'localhost'
const SERVER_SIDE_API_PORT = process.env.SERVER_SIDE_API_PORT || 8080
const CLIENT_SIDE_API_HOST = process.env.CLIENT_SIDE_API_HOST || 'localhost'
const CLIENT_SIDE_API_PORT = process.env.CLIENT_SIDE_API_PORT || 8080
const SERVER_NAME = 'foo'

//const serverSideApiUrl = `http://${API_HOST}:${API_PORT}`
const serverSideApiUrl = dev == true ? `http://${CLIENT_SIDE_API_HOST}:${CLIENT_SIDE_API_PORT}` : `http://${SERVER_SIDE_API_HOST}:${SERVER_SIDE_API_PORT}`
//const clientSideApiUrl = `http://www.${SERVER_NAME}.com/api`
const clientSideApiUrl = dev === true ? `http://${CLIENT_SIDE_API_HOST}:${CLIENT_SIDE_API_PORT}` : `http://${CLIENT_SIDE_API_HOST}:${CLIENT_SIDE_API_PORT}`

function updateOptions(options) {
  const update = {
    ...options
  };
  update.headers = {
    ...update.headers,
    'Connection': 'keep-alive',
    'content-type': 'application/json',
  };
  return update;
}

function _fetch(url, options?) {
  return fetch(url, updateOptions(options)).then((res) => {
    if (res.status >= 400 && res.status < 600) {
      throw new Error("Bad response from server");
    }
    return res;
  })
  .catch(err => {
    console.log(`_fetch error ${err}`)
  })
}

export function getAllUsers() {
  return _fetch(`${serverSideApiUrl}/users`)
    .then(res => res.json())
}

export function createUser(user) {
  return _fetch(`${clientSideApiUrl}/user`,
    {
      method: 'POST',
      body: JSON.stringify(user)
    });
}

export function updateUserById(id, user) {
  return _fetch(`${clientSideApiUrl}/user/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(user)
    });
}

export function deleteUserById(id) {
  return _fetch(`${clientSideApiUrl}/user/${id}`,
    {
      method: 'DELETE',
    });
}

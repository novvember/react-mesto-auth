const BASE_URL = 'https://auth.nomoreparties.co';

export function register({email, password}) {
  const url = `${BASE_URL}/signup`;
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  })
    .then(res => {
      if (res.ok) return res.json();
      // Получить сообщение об ошибке с сервера
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    });
}

export function authorize({email, password}) {
  const url = `${BASE_URL}/signin`;
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  })
    .then(res => {
      if (res.ok) return res.json();
      // Получить сообщение об ошибке с сервера
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    })
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      return res;
    });
}

export function checkToken(token) {
  const url = `${BASE_URL}/users/me`;
  return fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  })
    .then(res => {
      if (res.ok) return res.json();
      // Получить сообщение об ошибке с сервера
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    });
}

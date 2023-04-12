const loginHandler = async (event) => {

  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email,
        password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {

      document.location.replace('/dashboard');

    } else {

      alert(response.statusText);

    }

  }

};

const registerHandler = async (event) => {

  event.preventDefault();

  const username = document.querySelector('#register-name').value.trim();
  const email = document.querySelector('#register-email').value.trim();
  const password = document.querySelector('#register-password').value.trim();

  if (username && email && password) {

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
        water_goal: 64 // default water intake (eight 8 oz glasses)
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {

      document.location.replace('/dashboard');

    } else {

      alert(response.statusText);

    }

  }

};

document.querySelector('#login-form').addEventListener('submit', loginHandler);

document
  .querySelector('.register-form')

  .querySelector('#signup-form')
  .addEventListener('submit', registerHandler);



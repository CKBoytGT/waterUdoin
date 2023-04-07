const registerHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#register-name').value.trim();
  const email = document.querySelector('#register-email').value.trim();
  const password = document.querySelector('#register-password').value.trim();

  //need to verify routes when routes are made
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector('.login-container')
  .addEventListener('submit', loginHandler);

document
  .querySelector('.register-container')
  .addEventListener('submit', registerHandler);
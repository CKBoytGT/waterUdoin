const intakeHandler = async (event) => {

  event.preventDefault();

  const amount = document.querySelector('#amount').value.trim();

  if (amount) {

    const response = await fetch('/api/logs', {
      method: 'POST',
      body: JSON.stringify({ amount }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {

      window.location.reload();

    } else {

      alert(response.statusText);

    }

  }

};

const goalHandler = async (event) => {

  event.preventDefault();

  const waterGoal = document.querySelector('#goal').value.trim();

  if (waterGoal) {

    const response = await fetch('/api/users/goal', {
      method: 'PUT',
      body: JSON.stringify({ waterGoal }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {

      window.location.reload();

    } else {

      alert(response.statusText);

    }

  }

};

document
  .querySelector('#intake-form')
  .addEventListener('submit', intakeHandler);

document.querySelector('#goal-form').addEventListener('submit', goalHandler);

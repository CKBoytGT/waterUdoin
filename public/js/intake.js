const intakeHandler = async (event) => {
  event.preventDefault();

  let amount = document.querySelector("#amount").value.trim();

  if (amount) {
    // multiply by 8 to convert glasses to ounces
    amount *= 8;

    const response = await fetch("/api/logs", {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setTimeout(() => {
        window.location.reload();
      }, "500");
    } else {
      alert(response.statusText);
    }
  }
};

const goalHandler = async (event) => {
  event.preventDefault();

  let waterGoal = document.querySelector("#goal").value.trim();

  if (waterGoal) {
    // multiply by 8 to convert glasses to ounces
    waterGoal *= 8;

    const response = await fetch("/api/users/goal", {
      method: "PUT",
      body: JSON.stringify({ waterGoal }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setTimeout(() => {
        window.location.reload();
      }, "500");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#intake-form")
  .addEventListener("submit", intakeHandler);

document.querySelector("#goal-form").addEventListener("submit", goalHandler);

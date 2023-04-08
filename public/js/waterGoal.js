const weightInput = document.querySelector('#weight');
const exerciseTimeInput = document.querySelector('#exercise-time');
const calculateButton = document.querySelector('#calculate-button');
const resultContainer = document.querySelector('#result-container');

calculateButton.addEventListener('click', async (event) => {

  event.preventDefault();

  const weight = parseFloat(weightInput.value);
  const exerciseTime = parseFloat(exerciseTimeInput.value);

  if (!isNaN(weight) && !isNaN(exerciseTime)) {

    const waterGoal = weight / 2 + exerciseTime / 30 * 12;
    resultContainer.textContent = `Your recommended water intake is ${waterGoal} fl oz per day.`;

    // This needs to be placed into a controller file
    /* const user = await User.findByPk('id');
    user.water_goal = waterGoal;
    await user.save(); */

  } else {

    resultContainer.textContent = 'Please enter valid input values.';

  }

});

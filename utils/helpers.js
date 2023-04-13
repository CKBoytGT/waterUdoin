module.exports = {
  glass_to_oz: (amount) => {

    if (!amount) {

      return 0;

    }

    return amount * 8;

  },
  oz_to_glass: (amount) => {

    if (!amount) {

      return 0;

    }

    return Math.round(amount / 8);

  },
  null_to_zero: (amount) => {

    if (!amount) {

      return 0;

    }

    return amount;

  },
  percent_goal: (intake, goal) => {

    if (!intake) {

      return 0;

    } else {

      return Math.round(intake / goal * 100);

    }

  },
  stringify: (input) => {

    return JSON.stringify(input);

  }
};

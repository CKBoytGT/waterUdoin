const router = require("express").Router();
const { User } = require("../../models");

// create a new user account
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// log in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({
        message: "Incorrect email or password, please try again",
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "Incorrect email or password, please try again",
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// log out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// update user's water goal
router.put("/goal", async (req, res) => {
  try {
    const userUpdate = await User.update(
      { water_goal: req.body.waterGoal },
      {
        where: {
          id: req.session.user_id,
        },
      },
    );

    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: calculate user's leaderboard score (today's intake + 30 days?)

module.exports = router;

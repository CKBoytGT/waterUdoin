const router = require('express').Router();
const { User, Log } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

  try {

    // get logged_in status to be used in views' if-then helpers
    res.render('homepage', {
      logged_in: req.session.logged_in
    });

  } catch (err) {

    res.status(500).json(err);

  }

});

// withAuth prevents access if not logged in
router.get('/dashboard', withAuth, async (req, res) => {

  try {

    // find logged in user based on session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: { model: Log }
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });

  } catch (err) {

    res.status(500).json(err);

  }

});

router.get('/login', (req, res) => {

  // if user is already logged in, redirect to dashboard
  if (req.session.logged_in) {

    res.redirect('/dashboard');
    return;

  }

  res.render('login');

});

// router.get('/chart', async (req, res) => {

//   try {

//     const userData = await User.findAll({ include: [Log] });

//     // separte all the usernames and the log data. with the log data we will need to add up all the amount drank

//   } catch (err) {

//     console.log(err);

//   }

// });

module.exports = router;

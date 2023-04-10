const router = require('express').Router();
const { User, Log } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

  res.render('homepage');

});

// TODO: withAuth middleware prevents access to route
// router.get('/dashboard', withAuth, async (req, res) => {
router.get('/dashboard', async (req, res) => {

  try {

    // TODO: find logged in user based on session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] }
    // });

    // TODO: const user = userData.get({ plain: true });

    res.render('dashboard', {
      // TODO: ...user,
      // TODO: logged_in: true
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

// TODO: withAuth middleware prevents access to route
// router.get('/dashboard', withAuth, async (req, res) => {
router.get('/dashboard', async (req, res) => {

  try {

    // TODO: find logged in user based on session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] }
    // });

    // TODO: const user = userData.get({ plain: true });

    res.render('dashboard', {
      // TODO: ...user,
      // TODO: logged_in: true
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

router.get('/chart', async (req, res) => {
try{
  const userData =  await User.findAll({ include:  [Log]})

  // separte all the usernames and the log data. with the log data we will need to add up all the amount drank

}catch (err){
  console.log(err)
}
  

})

module.exports = router;

const router = require('express').Router();
const { User, Log } = require('../models');
const { Op } = require('sequelize');
const withAuth = require('../utils/auth');
// const sequelize = require('../config/connection');

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

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const now = new Date();
    const thirtyAgo = new Date(
      new Date(new Date().setDate(new Date().getDate() - 30)).setHours(
        0,
        0,
        0,
        0
      )
    );

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: {
        model: Log,
        where: {
          user_id: req.session.user_id,
          date: {
            [Op.gt]: todayStart,
            [Op.lt]: now
          }
        },
        required: false
      }
    });

    const user = userData.get({ plain: true });

    const monthlyData = await Log.findAll({
      where: {
        user_id: req.session.user_id,
        date: {
          [Op.gt]: thirtyAgo,
          [Op.lt]: now
        }
      },
      order: [['date', 'DESC']]
    });

    const monthly = monthlyData.map((log) => log.get({ plain: true }));

    // TODO: get this working after class
    // const leaderData = await sequelize.query(
    //   'SELECT user.username, log.amount, (log.amount / user.water_goal * 100) AS "percentReached" FROM log INNER JOIN user ON log.user_id = user.id AND log.date LIKE "2023-04-13%" ORDER BY "percentReached" DESC'
    // );

    // const leaders = leaderData.map((user) => user.get({ plain: true }));

    res.render('dashboard', {
      ...user,
      monthly,
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

module.exports = router;

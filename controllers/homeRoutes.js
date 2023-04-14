const router = require('express').Router();
const { User, Log } = require('../models');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

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

    // start and end of today
    const todayStart = new Date(
      new Date(new Date().setHours(0, 0, 0, 0)).setUTCHours(0)
    );
    const now = new Date();

    // 30 days from the start of today
    let thirtyAgo = new Date(todayStart);
    thirtyAgo.setDate(thirtyAgo.getDate() - 30);

    // start of today with just the initial date part
    const formattedDate = todayStart.toISOString().split('T')[0];

    // gets logged in user's current intake for today
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

    // get's logged in user's last 30 logs
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

    // arranges users by their current day's percentage of goal and gets top 5
    const leader = await sequelize.query(
      `SELECT user.username, (log.amount / user.water_goal * 100) AS "percentReached" FROM log INNER JOIN user ON log.user_id = user.id AND log.date LIKE "${formattedDate}%" ORDER BY percentReached DESC LIMIT 5`,
      { type: QueryTypes.SELECT,
        raw: true }
    );

    res.render('dashboard', {
      ...user,
      monthly,
      leader,
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

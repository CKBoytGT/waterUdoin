const router = require('express').Router();
const { Log } = require('../../models');
const { Op } = require('sequelize');
// const withAuth = require('../../utils/auth');

// post a new log (and overwrite current day's log if applicable)
router.post('/', async (req, res) => {

  try {

    // get previous log from today if it exists
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const now = new Date();

    const logData = await Log.findAll({
      where: {
        user_id: req.session.user_id,
        date: {
          [Op.gt]: todayStart,
          [Op.lt]: now
        }
      }
    });

    // if there was no data logged today, create a new log
    if (!logData || JSON.stringify(logData) === '[]') {

      const newLog = await Log.create({
        amount: req.body.amount,
        user_id: req.session.user_id
      });

      res.status(200).json(newLog);

    } else {

      // overwrite previous log from today if it exists
      const updateLog = await Log.update(
        { amount: req.body.amount },
        {
          where: {
            user_id: req.session.user_id,
            date: {
              [Op.gt]: todayStart,
              [Op.lt]: now
            }
          }
        }
      );

      res.status(200).json(updateLog);

    }

  } catch (err) {

    res.status(400).json(err);

  }

});

// TODO: get most recent log for a user
// router.get('/', withAuth, async (req, res) => {});

// const logs = logData.map((log) => log.get({ plain: true }));

// TODO: get last 30 days logs for a user (based on user id?), inputting 0 for days not logged

// TODO: get user's water goal

module.exports = router;

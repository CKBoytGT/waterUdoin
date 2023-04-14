const router = require('express').Router();
const { Log } = require('../../models');
const { Op } = require('sequelize');
// const withAuth = require('../../utils/auth');

const formatDate = (date) => {

  return date.toISOString().replace('T', ' ').split('.')[0];

};

// post a new log (and overwrite current day's log if applicable)
router.post('/', async (req, res) => {

  try {

    // get previous log from today if it exists
    const todayStart = new Date(
      new Date(new Date().setHours(0, 0, 0, 0)).setUTCHours(0)
    );
    const todayEnd = new Date(
      new Date(new Date().setHours(23, 59, 59, 999)).setUTCHours(23)
    );

    const logData = await Log.findAll({
      where: {
        user_id: req.session.user_id,
        date: {
          [Op.gt]: formatDate(todayStart),
          [Op.lt]: formatDate(todayEnd)
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
              [Op.gt]: formatDate(todayStart),
              [Op.lt]: formatDate(todayEnd)
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

module.exports = router;

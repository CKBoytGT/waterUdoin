const router = require('express').Router();
const {  User, Log } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

  res.render('homepage');

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

const User = require('../models/User');

module.exports = async (req, res, next) => {
  user = await User.findById(req.session.userID);
  if (!user) return res.redirect('/login');
  next();
};

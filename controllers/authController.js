const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı buluyoruz
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User not found' });
    }

    // Şifreyi karşılaştırıyoruz
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Incorrect password' });
    }

    // Başarı durumu

    req.session.userID = user._id;

    return res.status(200).redirect('/users/dashboard');
  } catch (error) {
    // Hata yönetimi
    return res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({_id:req.session.userID})
    res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user
  });
};

exports.getMainPage = (req, res) => {
  res.status(200).redirect('/')
};

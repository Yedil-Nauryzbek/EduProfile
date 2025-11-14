const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Пользователь уже существует' });

    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ msg: 'Регистрация успешна', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Ошибка сервера' });
  }
};
  
import User from '../models/User.js';

const register = async (req, res) => {
  return res.send({ status: 'sucess', message: 'user registered' });
};

const login = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ status: 'error', error: 'Unauthorized' });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };

    res.redirect('/views/products');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const restore = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ status: 'error', error: 'user does not exist' });
    }

    const hashedPassword = createHash(password);

    await User.updateOne({ email }, { password: hashedPassword });

    return res.send({
      status: 'sucess',
      message: 'succesfully updated password',
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return res.status(400).json({ error: err.message });
    req.session.destroy((err) => next(err));
    res.redirect('/login');
  });
};

export { register, login, restore, logout };

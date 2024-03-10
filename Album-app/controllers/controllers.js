const Album = require('../models/albumSchema.js');
const User = require('../models/userSchema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError.js');

// ownership check
/*async function canUserModifyAlbum(userId, albumId, role) {
  try {
    if (role === 'admin') {
      return { allowed: true };
    }

    const album = await Album.findOne({ albumId });

    if (!album) {
      return { allowed: false, reason: 'Album not found' };
    }
    return album.userId === userId ?
      { allowed: true } :
      { allowed: false, reason: 'Not authorized. You can only delete albums you have made yourself' };
  } catch (error) {
    throw new CustomError(500, 'Something went wrong');
  }
}*/

// update password for user
const updatePassword = async (req, res) => {
  const { email, currentPassword, newPassword, confirmedPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(404, 'User not found');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new CustomError(400, 'Current password is incorrect');
    }
    // TODO: implement validation for password requirements!
    user.password = newPassword;
    user.passwordConf = confirmedPassword;
    await user.save();

    res.send('Password updated successfully.');
  } catch (error) {
    throw new CustomError(500, 'Server error');
  }
};
// user login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  /* eslint-disable no-undef */
  if (user && bcrypt.compareSync(password, user.password)) { // grant user the authToken if login is successfull
    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    // issue the refreshToken and save it to db
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
    user.refreshToken = refreshToken;
    await user.save();
    // session initializer
    req.session.userId = user._id;
    res.json({ authToken, refreshToken, name: user.name, sessionId: req.sessionID, userId: user._id, role: user.role });
  } else {
    throw new CustomError(401, 'Invalid email or password');
  }
  /* eslint-enable no-undef */
};

// user logout
const logout = async (req, res) => {
  const userId = req.body;
  if (!userId) return res.status(400).send('User not logged in');
  try {
    await User.findOneAndUpdate({ _id: userId }, { refreshToken: '' }, { new: true }); // remove refreshToken from user.refreshToken
    req.session.destroy(error => { // destroy the current session in server
      if (error) {
        throw new CustomError(500, 'Could not log out, please try again');
      } else {
        res.clearCookie('connect.sid');
        res.send('Logged out successfully!');
      }
    });
  } catch (error) {
    throw new CustomError(500, 'Failed to log out');
  }
};

// delete album
const deleteAlbum = async (req, res) => {
  const { albumId } = req.params;
  /*const userId = req.user.userId;
  
  const user = await User.findById(userId);

  const access = await canUserModifyAlbum(userId, albumId, user.role);

  if (!access.allowed) {
    return res.status(access.reason === 'Album not found' ? 404: 403).send(access.reason);
  }
  console.log('access?', access.allowed);*/
  const deletedAlbum = await Album.findOneAndDelete({ albumId: albumId });

  if (!deletedAlbum) {
    throw new CustomError(404, `No album found with id ${albumId}`);
  }

  res.status(200).json({ success: true, data: deletedAlbum });
};

// get all albums
const getAlbums = async (req, res) => {
  let sortOption = {};
  let query = {};
  let projection = { albumId: 1, tracks: 1, updatedAt: 1 };

  // handle startYear and endYear in query
  if (req.query.startYear || req.query.endYear) {
    query.year = {};
    if (req.query.startYear) {
      query.year.$gte = parseInt(req.query.startYear); // Convert to number
    }
    if (req.query.endYear) {
      query.year.$lte = parseInt(req.query.endYear); // Convert to number
    }
  }
  // handle sort key in query
  if (req.query.sort) {
    sortOption[req.query.sort] = 'asc'; 
  }
  // handle search key in query
  if (req.query.search) {
    query.artist = { $regex: req.query.search, $options: 'i' };
  }
  if (req.query.fields) {
    req.query.fields.split(',').forEach(field => {
      projection[field] = 1;
    });
  }

  const albums = await Album.find(query, projection).sort(sortOption);
  res.status(200).json({ success: true, albums });
};


// get album by id
const getAlbumId = async (req, res) => {
  const { id } = req.params;
  const album = await Album.findOne({ albumId: id });

  if (!album) {
    throw new CustomError(404, `No album found with id ${id}`);
  }

  res.status(200).json({ success: true, data: album });
};

// create album
const createAlbum = async (req, res) => {
  const { artist, title, year, genre, tracks, id } = req.body;


  if (!artist || !title || !year || !genre || !tracks) {
    throw new CustomError(400, 'Missing required album fields');
  }
  const highId = await Album.findOne().sort({ albumId: -1 }).lean();
  
  let nextId = 1; // Initialize to 1 if there are no existing albums
  
  if (highId !== null) {
    // Calculate the nextId if there are existing albums
    nextId = highId.albumId + 1;
  }
  const newAlbum = new Album({
    albumId: nextId,
    artist,
    title,
    year,
    genre,
    tracks,
    userId: id,
  });
  
  await newAlbum.save();
  res.status(201).json({ success: true, msg: 'New album added.', data: newAlbum });
};

// register user
const register = async (req, res) => {
  const { name, email, password, passwordConf } = req.body;
  if (!name || !email || !password || !passwordConf) {
    throw new CustomError(400, 'Fill all the fields to register.');
  }
  const newUser = new User({
    name,
    email,
    password,
    passwordConf,
  });
  try {
    await newUser.save();
    res.status(201).json({ success: true, msg: 'New user created,', data: newUser});
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    throw new CustomError(statusCode, error.message);
  }
};


// update album
const updateAlbum = async (req, res) => {
  const { albumId } = req.params;
  const newAlbum = req.body;

  const updatedAlbum = await Album.findOneAndUpdate(
    { albumId: albumId },
    newAlbum,
    { new: true });

  if (!updatedAlbum) {
    throw new CustomError(404, `No album found with id ${albumId}`);
  }

  res.status(200).json({ success: true, msg: 'Album successfully updated!', data: updatedAlbum });
};

// update user
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { role: role } },
    { new: true }
  );

  if (!updatedUser) {
    throw new CustomError(404, `No user found with id ${userId}`);
  }
  res.status(200).json({ success: true, msg: 'User role updated successfully', data: updatedUser});
};

// delete user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findOneAndDelete({ _id: userId });

  if (!deletedUser) {
    throw new CustomError(404, `No user found with id ${userId}`);
  }

  res.status(200).json({ success: true, data: deletedUser });
};

// fetch all users
const fetchUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
};

module.exports = {
  deleteAlbum,
  createAlbum,
  updateAlbum,
  getAlbumId,
  getAlbums,
  register,
  login,
  updatePassword,
  logout,
  updateUser,
  deleteUser,
  fetchUsers,
};

const express = require('express');
const router = express.Router();
const { authenticationToken } = require('../middleware/middleware.js');

const {
  getAlbums,
  getAlbumId,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  register,
  login,
  updatePassword,
  logout,
  updateUser,
  deleteUser,
  fetchUsers,
} = require('../controllers/controllers.js');

//public routes
router.get('/albums',getAlbums);
router.get('/albums/:id', getAlbumId);
router.post('/register', register);
router.post('/login', login);
// protected routes
router.post('/albums/submit', createAlbum); /* removed authentication from testing*/
router.put('/albums/:albumId', authenticationToken, updateAlbum);
router.delete('/albums/:albumId', deleteAlbum); /* removed authentication from testing*/
router.post('/update-password', authenticationToken, updatePassword);
router.post('/logout', authenticationToken, logout);
router.delete('/deleteUser/:userId', authenticationToken, deleteUser);
router.put('/updateUser/:userId', authenticationToken, updateUser);
router.get('/users', authenticationToken,fetchUsers);

module.exports = router;
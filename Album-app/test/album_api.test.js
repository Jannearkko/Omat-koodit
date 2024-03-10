const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
// GET-test
test('albums are returned as json and length match ', async () => {
  const response = await api
    .get('/api/albums')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  expect(response.body.albums).toHaveLength(16);
});
// POST-test
test('a new album can be added and length match', async () => {
  const newAlbum = {
    'albumId':50,
    'artist':'Test Artist',
    'title':'Test Title',
    'year':2024,
    'genre':'Rock',
    'tracks':15,
  };

  await api
    .post('/api/albums/submit')
    .send(newAlbum)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const response = await api.get('/api/albums');
  expect(response.body.albums).toHaveLength(17);
});
// DELETE-test
test('an album can be deleted and length match', async () => {
  const id = '21';
  await api
    .delete(`/api/albums/${id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  const response = await api.get('/api/albums');
  expect(response.body.albums).toHaveLength(16);
});
// DELETE non-existent album
test('non-existent album DELETE handled correctly ', async () => {
  const id = '100';
  await api
    .delete(`/api/albums/${id}`)
    .expect(404)
    .expect('Content-Type', /application\/json/)
    .expect((response) => {
      if (response.body.status !== 'fail') {
        throw new Error('Expected status to be "fail"');
      }
      if (response.body.message !== `No album found with id ${id}`) {
        throw new Error('Expected message to be "No album found with id ${id}"');
      }
    });
});

afterAll(() => {
  mongoose.connection.close();
});
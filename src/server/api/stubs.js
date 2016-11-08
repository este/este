/* eslint-disable quotes */
import express from 'express';
import movies from './data/movies';
import reservations from './data/reservations';
import { remove } from 'diacritics';

const app = express();

function movieNameContains(name, query) {
  return remove(name.toLowerCase().replace(/ /g, '')).indexOf(remove(query.toLowerCase().replace(/ /g, ''))) !== -1;
}

app.get('/movies', (req, res) => {
  const { name } = req.query;
  if (req.query.name.length > 0) {
    res.json(movies.filter(x => movieNameContains(x.localizedName, name)
      || movieNameContains(x.originalName, name)));
  } else {
    res.json(movies);
  }
});

app.get('/reservations', (req, res) => {
  res.json(reservations);
});

app.get('/user', (req, res) => {
  res.json({
    id: 2342112,
    email: 'myemail@example.com',
    name: 'Xavier Nur'
  });
});

app.get('/cinema/:cinemaId/movie/:movieId/:time', (req, res) => {
  const { cinemaId, movieId, time } = req.params;
  res.json({
    cinemaId: parseInt(cinemaId, 10),
    movieId: parseInt(movieId, 10),
    time: parseInt(time, 10),
    rows: 10,
    seatsPerRow: 16
  });
});

app.on('mount', () => {
  console.log('API is at %s', app.mountpath);
});

export default app;

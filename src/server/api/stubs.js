/* eslint-disable quotes */
import express from 'express';
import movies from './data/movies';

const app = express();

function movieNameContains(name, query) {
  return name.toLowerCase().replace(' ', '').indexOf(query.toLowerCase().replace(' ', '')) !== -1;
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


app.on('mount', () => {
  console.log('API is at %s', app.mountpath);
});

export default app;

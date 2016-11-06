/* eslint-disable quotes */
import express from 'express';

const app = express();


app.get('/movies', (req, res) => {
  res.json(
    [
      {
        id: 0,
        originalName: 'The Conjuring',
        localizedName: 'V zajetí démonů',
        releaseDate: 1478122998,
        rating: 4.1
      },
      {
        id: 1,
        originalName: 'The Matrix',
        localizedName: 'Matrix',
        releaseDate: 1478122998,
        rating: 4.5
      }
    ]
  );
});


app.on('mount', () => {
  console.log('API is at %s', app.mountpath);
});

export default app;

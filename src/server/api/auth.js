import express from 'express';
import getRandomString from '../../common/lib/getRandomString';
import {createUser} from './userStorage';

const router = express.Router();

router.route('/login')
  .post((req, res, next) => {

    const {email, password} = req.body;

    // Simulate DB checks here.
    setTimeout(() => {
      // Use HTTP status code 401 for wrong authentication credentials.
      if (password !== 'pass1') res.status(401).end();

      // create user in user Storage
      const authToken = getRandomString();
      createUser(email, authToken);

      res.status(200).send({email, authToken}).end();
    }, 1000);

  });

export default router;

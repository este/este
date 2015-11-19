import express from 'express';
import {getUser} from './userStorage';

const router = express.Router();

router.route('/me')
  .get((req, res, next) => {

    // Simulate async access.
    setTimeout(() => {
      // In real app we would load user data from database

      const user = getUser(req.headers['authtoken']);

      if (!user) res.status(404).json({}).end();

      res.status(200).json(user).end();
    }, 100);

  });

export default router;

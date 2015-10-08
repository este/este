import express from 'express';
import User from '../../common/users/user';

const router = express.Router();

router.route('/user')
  .get((req, res, next) => {

    // Simulate async access.
    setTimeout(() => {
      // In real app we would load user data from database
      const user = new User({
        email: 'email@example.com'
      });
      res.status(200).send({user}).end();
    }, 10);

  });

export default router;

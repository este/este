import Todo from '../../common/todos/todo';
import express from 'express';

const router = express.Router();

router.route('/user')
  .get((req, res, next) => {

    // Simulate async access.
    setTimeout(() => {
      // In real app we would check user credentials and load user data from DB.
      const todo = new Todo({
        id: 1,
        title: 'Relax...'
      });
      res.status(200).send({todos: [todo]}).end();
    }, 50);

  });

export default router;

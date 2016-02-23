import Todo from '../../common/todos/todo';
import express from 'express';
import shortid from 'shortid';

const router = express.Router();

const todo = new Todo({
  createdAt: Date.now(),
  id: shortid.generate(),
  title: 'Relax...'
});
const todos = {
  [todo.id]: todo
};

router.route('/user')
  .get((req, res) => {
    // Simulate async access.
    // In real app we would check user credentials and load user data from DB.
    setTimeout(() => {
      res.status(200).send({ todos }).end();
    }, 50);
  });

export default router;

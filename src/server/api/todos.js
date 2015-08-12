import express from 'express';

const router = express.Router();

router.route('/')
  .post((req, res, next) => {
    // req.user had revived when processing server-side-rendering.
    // so authorization also works for server-side's fetchData.
    // can check permission here.
    const todolist = [
      {id: 2, title: 'relax'}
    ];
    res.json(todolist);
  });

export default router;

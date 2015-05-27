import express from 'express';

const router = express.Router();

router.route('/login')
  .post(function(req, res, next) {

    const {password} = req.body;

    // Simulate DB checks here
    setTimeout(() => {
      if (password !== 'pass1') {
        res.status(400).end();
      } else {
        res.status(200).end();
      }
    });

  });

export default router;
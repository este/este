import express from 'express';

const router = express.Router();

router.route('/login')
  .post(function(req, res, next) {
    console.log(req.body);
  });

export default router;
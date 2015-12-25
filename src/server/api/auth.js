import express from 'express';

const router = express.Router();

router.route('/login')
  .post((req, res) => {

    const {email, password} = req.body;

    // Simulate DB checks here.
    setTimeout(() => {
      // Use HTTP status code 401 for wrong authentication credentials.
      if (password !== 'pass1') res.status(401).end();
      else res.status(200).send({email}).end();
    }, 1000);

  });

export default router;

import express from 'express';

const router = express.Router();

router.route('/login')
  .post((req, res) => {

    const {email, password} = req.body;

    // Simulate DB checks here.
    setTimeout(() => {
      if (password !== 'pass1') {
        // Use HTTP status code 401 for wrong authentication credentials.
        res.status(401).end();
      } else {
        const id = Date.now();
        res.status(200).send({email, id}).end();
      }
    }, 1000);

  });

export default router;

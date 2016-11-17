/* @flow weak */

const resourceNotFound = (req, res) => {
  res.status(404).send();
};

export default resourceNotFound;

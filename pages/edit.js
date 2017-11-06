// @flow
import * as React from 'react';
import app from '../components/app';

const Edit = () => <div>edit</div>;

export default app(Edit, {
  requireAuth: true,
});

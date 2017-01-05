/* @flow */
import type { User } from '../../common/types';
import gravatar from 'gravatar';

const getUserPhotoUrl = (user: User) =>
  user.photoURL ||
  // Users signed in via email has displayName set to email.
  gravatar.url(user.displayName, {
    s: '100',
    r: 'x',
    d: 'retro',
    protocol: 'https'
  });

export default getUserPhotoUrl;

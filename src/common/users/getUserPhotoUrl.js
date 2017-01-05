/* @flow */
import type { User } from '../../common/types';
import gravatar from 'gravatar';

const getUserPhotoUrl = (user: User) =>
  user.photoURL ||
  // Users signed in via email has displayName set to email.
  gravatar.url(user.displayName, {
    d: 'retro',
    protocol: 'https',
    r: 'x',
    s: '100',
  });

export default getUserPhotoUrl;

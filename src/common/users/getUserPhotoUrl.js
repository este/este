// @flow
import type { User } from '../../common/types';
import gravatar from 'gravatar-api';

const getUserPhotoUrl = (user: User) =>
  user.photoURL ||
  gravatar.imageUrl({
    // Users signed in via email has displayName set to email.
    email: user.displayName,
    parameters: {
      default: 'retro',
      rating: 'x',
      size: 100,
    },
    secure: true,
  });

export default getUserPhotoUrl;

import React from 'react';
import Immutable from 'immutable';
import install from 'immutable-devtools';

window.React = React;
window.Immutable = Immutable;
install(Immutable);

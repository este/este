import React from 'react';
import AppContext from '../contexts/AppContext';

const useAppContext = () => {
  const appContext = React.useContext(AppContext);
  if (appContext == null)
    throw Error('useAppContext: Please provide AppContext value.');
  return appContext;
};

export default useAppContext;

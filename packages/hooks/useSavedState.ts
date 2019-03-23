import React from 'react';

const useSavedState = (disabled: boolean, saved: boolean) => {
  const [wasUnsaved, setWasUnsaved] = React.useState(false);
  const [wasSaved, setWasSaved] = React.useState(false);
  if (!saved && !wasUnsaved) setWasUnsaved(true);
  if (saved && wasUnsaved && !wasSaved) setWasSaved(true);
  return [disabled || saved ? true : !wasUnsaved, saved && wasSaved];
};

export default useSavedState;

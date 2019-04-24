import { useState } from 'react';

export const useSavedState = (disabled: boolean, saved: boolean) => {
  const [wasUnsaved, setWasUnsaved] = useState(false);
  const [wasSaved, setWasSaved] = useState(false);
  if (!saved && !wasUnsaved) setWasUnsaved(true);
  if (saved && wasUnsaved && !wasSaved) setWasSaved(true);
  return [disabled || saved ? true : !wasUnsaved, saved && wasSaved];
};

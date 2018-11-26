// @flow
import { useCallback } from 'react';

// Workaround for https://github.com/necolas/react-native-web/issues/1189
// TODO: Remove it.
export default function useEscapeFix(
  onEscape: () => void,
): [() => void, () => void] {
  const handleKeydown = useCallback((event: any) => {
    if (event.key === 'Escape') onEscape();
  }, []);
  const onFocus = useCallback((event: any) => {
    event.currentTarget.addEventListener('keydown', handleKeydown);
  }, []);
  const onBlur = useCallback((event: any) => {
    event.currentTarget.removeEventListener('keydown', handleKeydown);
  }, []);
  return [onFocus, onBlur];
}

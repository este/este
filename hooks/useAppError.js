// @flow
import { useContext } from 'react';
import AppErrorContext from '../components/core/AppErrorContext';

export default function useAppError() {
  return useContext(AppErrorContext);
}

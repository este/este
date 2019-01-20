import { CreateWebErrors, CreateWebInput } from '../api/types';
import { validateMax140Chars } from './';

const validateCreateWeb = (input: CreateWebInput): CreateWebErrors => ({
  name: validateMax140Chars(input.name),
});

export default validateCreateWeb;

import { validateMax140Chars } from '.';
import { NexusGenAllTypes } from '../typegen';

export const validateCreateWeb = (
  input: NexusGenAllTypes['CreateWebInput'],
): Required<NexusGenAllTypes['CreateWebErrors']> => ({
  name: validateMax140Chars(input.name),
});

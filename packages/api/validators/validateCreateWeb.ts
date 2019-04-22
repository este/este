import { validateMax140Chars } from '.';
import { NexusGenAllTypes } from '../typegen';

const validateCreateWeb = (
  input: NexusGenAllTypes['CreateWebInput'],
): Required<NexusGenAllTypes['CreateWebErrors']> => ({
  name: validateMax140Chars(input.name),
});

export default validateCreateWeb;

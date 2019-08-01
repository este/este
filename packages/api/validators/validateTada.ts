import { validateMax140Chars } from '.';
import { NexusGenAllTypes } from '../generated/nexus';

export const validateCreateTada = (
  input: NexusGenAllTypes['TadaCreateInput'],
): Required<NexusGenAllTypes['TadaCreateErrors']> => ({
  name: validateMax140Chars(input.name),
});
export const validateUpdateTada = (
  input: Omit<NexusGenAllTypes['TadaUpdateInput'], 'id'>,
): Required<NexusGenAllTypes['TadaCreateErrors']> => ({
  name: input.name ? validateMax140Chars(input.name) : null,
});

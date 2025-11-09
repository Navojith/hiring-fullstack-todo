import { v4 as uuidv4 } from 'uuid';
import type { PREFIX, PrefixedUUID } from '../types/common.d.ts';

export const generatePrefixedUUID = (prefix: PREFIX): PrefixedUUID => {
  const uuid = uuidv4();
  const prefixed = `${prefix}-${uuid}`;
  return prefixed as PrefixedUUID;
};

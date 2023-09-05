import { UUID } from 'crypto';

export function isUUID(id: string): id is UUID {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export function isDatabaseError(err: any): err is DatabaseError {
  return err.code !== undefined;
}

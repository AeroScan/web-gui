export const extractParam = (strObj: string, key: string): number | undefined =>
  JSON.parse(strObj)[key];

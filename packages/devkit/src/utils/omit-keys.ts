export function omitKeys(obj: object, omitKeys: string[]) {
  return Object.keys(obj).reduce((result, key) => {
    if (!omitKeys.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

export const filterUndefinedFields = (
  obj: Record<string, any>,
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  );
};

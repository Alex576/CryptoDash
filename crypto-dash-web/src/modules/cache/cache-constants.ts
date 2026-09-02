export const CacheConstants = {
  DURATION: 31536000000,
  OBJ_BY_ID_CLASS: (id: number | string, classCode: number | string) => `obj_${id}_${classCode}`,
  OBJ_INDEX_BY_ID: (id: number | string) => `obj_index:id:${id}`,
  OBJ_INDEX_BY_CLASS: (classCode: number | string) => `obj_index:classCode:${classCode}`,
};

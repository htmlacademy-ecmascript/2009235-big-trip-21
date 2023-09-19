const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isObject = (object) => object !== null && typeof object === 'object';

const isObjectsDeepEqual = (object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) {
    return false;
  }

  for (const key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isObjectsDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }

  return true;
};

const deleteIdKey = (obj) => Object.entries(obj).filter(([key]) => key !== 'id').reduce((res, [key, value]) => ({ ...res, [key]: value}), {});

export {
  isObjectsDeepEqual,
  deleteIdKey,
  isEscapeKey,
};

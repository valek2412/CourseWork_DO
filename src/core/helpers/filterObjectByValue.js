const filterObjectByValue = (object, func) =>
  Object.keys(object).filter((s) => func(object[s]));

export default filterObjectByValue;

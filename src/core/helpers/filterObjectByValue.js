const filterObjectByValue = (object, func) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value |> func)
  );

export default filterObjectByValue;

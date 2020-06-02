import { random } from "lodash";

const randomPop2Items = (arr) => {
  if (arr.length < 2) {
    if (arr.length === 1) {
      return arr.pop();
    }
    return null;
  }
  const pickItem = () => {
    const index = random(arr.length - 1);
    const [parent] = arr.splice(index, 1);
    return parent;
  };
  return [pickItem(), pickItem()];
};

export { randomPop2Items };

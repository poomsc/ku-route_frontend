export const removeElementFromArray = (arr: any[], target: any) => {
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (val === target) {
      return arr.slice(0, i).concat(arr.slice(i + 1));
    }
  }
  return arr
};

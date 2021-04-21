/**
 * Verifica se cada elemento do segundo array está presente
 * dentro do primeiro array
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {boolean}
 */
const containsAll = (arr1: Array<string>, arr2: Array<string>): boolean => {
  return arr2.every(item => arr1.includes(item));
};

/**
 * Verifica se dois arrays têm os mesmos objetos
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @returns {boolean}
 */
const sameMembers = (arr1: Array<string>, arr2: Array<string>): boolean => {
  return containsAll(arr1, arr2) && containsAll(arr2, arr1);
};

export { sameMembers };

import { KeyValue } from 'store/types';

export const mapKeyValue = (array: KeyValue[]) => {
  return array.reduce((map: any, obj) => {
    if (obj.key) map[obj.key] = obj.value;
    if (obj.name) map[obj.name] = obj.value;
    return map;
  }, {});
};

export default { mapKeyValue };

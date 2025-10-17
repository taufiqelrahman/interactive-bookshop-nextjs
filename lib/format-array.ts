interface KeyValueItem {
  key?: string;
  name?: string;
  value: any;
}

export const mapKeyValue = (array: KeyValueItem[]): Record<string, any> => {
  return array.reduce(
    (map, obj) => {
      if (obj.key) map[obj.key] = obj.value;
      if (obj.name) map[obj.name] = obj.value;
      return map;
    },
    {} as Record<string, any>,
  );
};

const formatArray = { mapKeyValue };
export default formatArray;

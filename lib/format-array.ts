export const mapKeyValue = array => {
  return array.reduce((map, obj) => {
    if (obj.key === 'Occupations') {
      map[obj.key] = obj.value.split(',');
      return map;
    }
    if (obj.key) map[obj.key] = obj.value;
    if (obj.name) map[obj.name] = obj.value;
    return map;
  }, {});
};

export default { mapKeyValue };
